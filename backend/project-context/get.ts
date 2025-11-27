import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

interface GetProjectContextParams {
  projectId: string;
}

export interface ProjectContext {
  project_id: string;
  primary_users: any;
  primary_users_comments: string | null;
  critical_actions: any;
  critical_actions_comments: string | null;
  builders: any;
  builders_comments: string | null;
  required_capabilities: any;
  capabilities_comments: string | null;
  user_structure: string;
  user_structure_comments: string | null;
  created_at: Date;
  updated_at: Date;
}

export const get = api<GetProjectContextParams, ProjectContext>(
  { expose: true, method: "GET", path: "/project-contexts/:projectId", auth: true },
  async ({ projectId }) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const project = await db.queryRow<{ user_id: string }>`
      SELECT user_id FROM projects WHERE id = ${projectId}
    `;

    if (!project || project.user_id !== authData.userID) {
      throw APIError.permissionDenied("project not found or access denied");
    }

    const context = await db.queryRow<ProjectContext>`
      SELECT project_id, primary_users, primary_users_comments,
             critical_actions, critical_actions_comments, builders,
             builders_comments, required_capabilities, capabilities_comments,
             user_structure, user_structure_comments, created_at, updated_at
      FROM project_contexts
      WHERE project_id = ${projectId}
    `;

    if (!context) {
      throw APIError.notFound("project context not found");
    }

    return context;
  }
);
