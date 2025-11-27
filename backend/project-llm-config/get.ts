import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

interface GetProjectLLMConfigParams {
  projectId: string;
}

export interface ProjectLLMConfig {
  project_id: string;
  orchestrator_llm: string;
  orchestrator_model: string;
  fallback_llm: string | null;
  max_tokens_per_task: number;
  temperature: number;
  created_at: Date;
  updated_at: Date;
}

export const get = api<GetProjectLLMConfigParams, ProjectLLMConfig>(
  { expose: true, method: "GET", path: "/project-llm-configs/:projectId", auth: true },
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

    const config = await db.queryRow<ProjectLLMConfig>`
      SELECT project_id, orchestrator_llm, orchestrator_model, fallback_llm,
             max_tokens_per_task, temperature, created_at, updated_at
      FROM project_llm_configs
      WHERE project_id = ${projectId}
    `;

    if (!config) {
      throw APIError.notFound("LLM config not found");
    }

    return config;
  }
);
