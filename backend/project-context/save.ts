import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { ProjectContext } from "./get";

interface SaveProjectContextRequest {
  project_id: string;
  primary_users?: any;
  primary_users_comments?: string;
  critical_actions?: any;
  critical_actions_comments?: string;
  builders?: any;
  builders_comments?: string;
  required_capabilities?: any;
  capabilities_comments?: string;
  user_structure?: string;
  user_structure_comments?: string;
}

export const save = api<SaveProjectContextRequest, ProjectContext>(
  { expose: true, method: "POST", path: "/project-contexts", auth: true },
  async (req) => {
    const {
      project_id,
      primary_users,
      primary_users_comments,
      critical_actions,
      critical_actions_comments,
      builders,
      builders_comments,
      required_capabilities,
      capabilities_comments,
      user_structure,
      user_structure_comments,
    } = req;

    try {
      const context = await db.queryRow<ProjectContext>`
        INSERT INTO project_contexts (
          project_id, primary_users, primary_users_comments,
          critical_actions, critical_actions_comments, builders,
          builders_comments, required_capabilities, capabilities_comments,
          user_structure, user_structure_comments
        )
        VALUES (
          ${project_id}, ${primary_users ?? null}, ${primary_users_comments ?? null},
          ${critical_actions ?? null}, ${critical_actions_comments ?? null}, ${builders ?? null},
          ${builders_comments ?? null}, ${required_capabilities ?? null}, ${capabilities_comments ?? null},
          ${user_structure ?? null}, ${user_structure_comments ?? null}
        )
        RETURNING project_id, primary_users, primary_users_comments,
                  critical_actions, critical_actions_comments, builders,
                  builders_comments, required_capabilities, capabilities_comments,
                  user_structure, user_structure_comments, created_at, updated_at
      `;

      if (!context) {
        throw APIError.internal("failed to save project context");
      }

      return context;
    } catch (err: any) {
      if (err.code === "23503") {
        throw APIError.invalidArgument("project not found");
      }
      if (err.code === "23505") {
        throw APIError.alreadyExists("project context already exists");
      }
      throw err;
    }
  }
);
