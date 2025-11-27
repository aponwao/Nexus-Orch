import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectLLMConfig } from "./get";

interface SaveProjectLLMConfigRequest {
  project_id: string;
  orchestrator_llm: string;
  orchestrator_model: string;
  fallback_llm?: string;
  max_tokens_per_task?: number;
  temperature?: number;
}

export const save = api<SaveProjectLLMConfigRequest, ProjectLLMConfig>(
  { expose: true, method: "POST", path: "/project-llm-configs", auth: true },
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

    const config = await db.queryRow<ProjectLLMConfig>`
      INSERT INTO project_llm_configs (
        project_id, orchestrator_llm, orchestrator_model, fallback_llm,
        max_tokens_per_task, temperature
      )
      VALUES (
        ${req.project_id}, ${req.orchestrator_llm}, ${req.orchestrator_model},
        ${req.fallback_llm || null}, ${req.max_tokens_per_task || 4000},
        ${req.temperature !== undefined ? req.temperature : 0.7}
      )
      ON CONFLICT (project_id) DO UPDATE SET
        orchestrator_llm = EXCLUDED.orchestrator_llm,
        orchestrator_model = EXCLUDED.orchestrator_model,
        fallback_llm = EXCLUDED.fallback_llm,
        max_tokens_per_task = EXCLUDED.max_tokens_per_task,
        temperature = EXCLUDED.temperature,
        updated_at = NOW()
      RETURNING project_id, orchestrator_llm, orchestrator_model, fallback_llm,
                max_tokens_per_task, temperature, created_at, updated_at
    `;

    if (!config) {
      throw APIError.internal("failed to save LLM config");
    }

    return config;
  }
);
