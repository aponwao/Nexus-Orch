import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

interface GetProjectIdeaParams {
  projectId: string;
}

export interface ProjectIdea {
  project_id: string;
  raw_idea: string;
  problems: any;
  problems_comments: string | null;
  target_users: any;
  target_users_comments: string | null;
  current_solutions: any;
  current_solutions_comments: string | null;
  differentiators: any;
  differentiators_comments: string | null;
  summary: string | null;
  created_at: Date;
  updated_at: Date;
}

export const get = api<GetProjectIdeaParams, ProjectIdea>(
  { expose: true, method: "GET", path: "/project-ideas/:projectId", auth: true },
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

    const idea = await db.queryRow<ProjectIdea>`
      SELECT project_id, raw_idea, problems, problems_comments,
             target_users, target_users_comments, current_solutions,
             current_solutions_comments, differentiators, differentiators_comments,
             summary, created_at, updated_at
      FROM project_ideas
      WHERE project_id = ${projectId}
    `;

    if (!idea) {
      throw APIError.notFound("project idea not found");
    }

    return idea;
  }
);
