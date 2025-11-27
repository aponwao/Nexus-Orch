import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectStrategy } from "./get";

interface UpdateProjectStrategyRequest {
  projectId: string;
  modules?: any;
  modules_comments?: string;
  architecture_decisions?: any;
  infrastructure_decisions?: any;
  total_estimated_cost_min?: number;
  total_estimated_cost_max?: number;
}

export const update = api<UpdateProjectStrategyRequest, ProjectStrategy>(
  { expose: true, method: "PUT", path: "/project-strategies/:projectId", auth: true },
  async ({ projectId, modules, modules_comments, architecture_decisions, infrastructure_decisions, total_estimated_cost_min, total_estimated_cost_max }) => {
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

    const existing = await db.queryRow<{ project_id: string }>`
      SELECT project_id FROM project_strategies WHERE project_id = ${projectId}
    `;

    if (!existing) {
      throw APIError.notFound("strategy not found");
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (modules !== undefined) {
      updates.push(`modules = $${paramIndex++}`);
      values.push(modules);
    }
    if (modules_comments !== undefined) {
      updates.push(`modules_comments = $${paramIndex++}`);
      values.push(modules_comments);
    }
    if (architecture_decisions !== undefined) {
      updates.push(`architecture_decisions = $${paramIndex++}`);
      values.push(architecture_decisions);
    }
    if (infrastructure_decisions !== undefined) {
      updates.push(`infrastructure_decisions = $${paramIndex++}`);
      values.push(infrastructure_decisions);
    }
    if (total_estimated_cost_min !== undefined) {
      updates.push(`total_estimated_cost_min = $${paramIndex++}`);
      values.push(total_estimated_cost_min);
    }
    if (total_estimated_cost_max !== undefined) {
      updates.push(`total_estimated_cost_max = $${paramIndex++}`);
      values.push(total_estimated_cost_max);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    values.push(projectId);

    const query = `
      UPDATE project_strategies
      SET ${updates.join(", ")}
      WHERE project_id = $${paramIndex}
      RETURNING project_id, modules, modules_comments, architecture_decisions,
                infrastructure_decisions, total_estimated_cost_min,
                total_estimated_cost_max, created_at, updated_at
    `;

    const strategy = await db.rawQueryRow<ProjectStrategy>(query, ...values);

    if (!strategy) {
      throw APIError.internal("failed to update strategy");
    }

    return strategy;
  }
);
