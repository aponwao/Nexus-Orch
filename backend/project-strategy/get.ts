import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

interface GetProjectStrategyParams {
  projectId: string;
}

export interface ProjectStrategy {
  project_id: string;
  modules: any;
  modules_comments: string | null;
  architecture_decisions: any;
  infrastructure_decisions: any;
  total_estimated_cost_min: number | null;
  total_estimated_cost_max: number | null;
  created_at: Date;
  updated_at: Date;
}

export const get = api<GetProjectStrategyParams, ProjectStrategy>(
  { expose: true, method: "GET", path: "/project-strategies/:projectId", auth: true },
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

    const strategy = await db.queryRow<ProjectStrategy>`
      SELECT project_id, modules, modules_comments, architecture_decisions,
             infrastructure_decisions, total_estimated_cost_min,
             total_estimated_cost_max, created_at, updated_at
      FROM project_strategies
      WHERE project_id = ${projectId}
    `;

    if (!strategy) {
      throw APIError.notFound("strategy not found");
    }

    return strategy;
  }
);
