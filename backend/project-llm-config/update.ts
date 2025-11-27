import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectLLMConfig } from "./get";

interface UpdateProjectLLMConfigRequest {
  projectId: string;
  orchestrator_llm?: string;
  orchestrator_model?: string;
  fallback_llm?: string;
  max_tokens_per_task?: number;
  temperature?: number;
}

export const update = api<UpdateProjectLLMConfigRequest, ProjectLLMConfig>(
  { expose: true, method: "PUT", path: "/project-llm-configs/:projectId", auth: true },
  async ({ projectId, orchestrator_llm, orchestrator_model, fallback_llm, max_tokens_per_task, temperature }) => {
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
      SELECT project_id FROM project_llm_configs WHERE project_id = ${projectId}
    `;

    if (!existing) {
      throw APIError.notFound("LLM config not found");
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (orchestrator_llm !== undefined) {
      updates.push(`orchestrator_llm = $${paramIndex++}`);
      values.push(orchestrator_llm);
    }
    if (orchestrator_model !== undefined) {
      updates.push(`orchestrator_model = $${paramIndex++}`);
      values.push(orchestrator_model);
    }
    if (fallback_llm !== undefined) {
      updates.push(`fallback_llm = $${paramIndex++}`);
      values.push(fallback_llm);
    }
    if (max_tokens_per_task !== undefined) {
      updates.push(`max_tokens_per_task = $${paramIndex++}`);
      values.push(max_tokens_per_task);
    }
    if (temperature !== undefined) {
      updates.push(`temperature = $${paramIndex++}`);
      values.push(temperature);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    values.push(projectId);

    const query = `
      UPDATE project_llm_configs
      SET ${updates.join(", ")}
      WHERE project_id = $${paramIndex}
      RETURNING project_id, orchestrator_llm, orchestrator_model, fallback_llm,
                max_tokens_per_task, temperature, created_at, updated_at
    `;

    const config = await db.rawQueryRow<ProjectLLMConfig>(query, ...values);

    if (!config) {
      throw APIError.internal("failed to update LLM config");
    }

    return config;
  }
);
