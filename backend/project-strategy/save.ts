import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectStrategy } from "./get";

interface SaveProjectStrategyRequest {
  project_id: string;
  modules?: any;
  modules_comments?: string;
  architecture_decisions?: any;
  infrastructure_decisions?: any;
  total_estimated_cost_min?: number;
  total_estimated_cost_max?: number;
}

export const save = api<SaveProjectStrategyRequest, ProjectStrategy>(
  { expose: true, method: "POST", path: "/project-strategies", auth: true },
  async (req) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const project = await db.queryRow<{ user_id: string }>`
      SELECT user_id FROM projects WHERE id = ${req.project_id}
    `;

    if (!project || project.user_id !== authData.userID) {
      throw APIError.permissionDenied("project not found or access denied");
    }

    const strategy = await db.queryRow<ProjectStrategy>`
      INSERT INTO project_strategies (
        project_id, modules, modules_comments, architecture_decisions,
        infrastructure_decisions, total_estimated_cost_min, total_estimated_cost_max
      )
      VALUES (
        ${req.project_id}, ${req.modules || null}, ${req.modules_comments || null},
        ${req.architecture_decisions || null}, ${req.infrastructure_decisions || null},
        ${req.total_estimated_cost_min || null}, ${req.total_estimated_cost_max || null}
      )
      ON CONFLICT (project_id) DO UPDATE SET
        modules = EXCLUDED.modules,
        modules_comments = EXCLUDED.modules_comments,
        architecture_decisions = EXCLUDED.architecture_decisions,
        infrastructure_decisions = EXCLUDED.infrastructure_decisions,
        total_estimated_cost_min = EXCLUDED.total_estimated_cost_min,
        total_estimated_cost_max = EXCLUDED.total_estimated_cost_max,
        updated_at = NOW()
      RETURNING project_id, modules, modules_comments, architecture_decisions,
                infrastructure_decisions, total_estimated_cost_min,
                total_estimated_cost_max, created_at, updated_at
    `;

    if (!strategy) {
      throw APIError.internal("failed to save strategy");
    }

    return strategy;
  }
);
