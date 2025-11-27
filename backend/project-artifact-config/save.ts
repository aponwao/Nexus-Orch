import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectArtifactConfig } from "./get";

interface SaveProjectArtifactConfigRequest {
  project_id: string;
  size_tier: string;
  max_tokens_per_artifact?: number;
  prd_tokens_used?: number;
  constitution_tokens_used?: number;
  architecture_tokens_used?: number;
  schema_tokens_used?: number;
}

export const save = api<SaveProjectArtifactConfigRequest, ProjectArtifactConfig>(
  { expose: true, method: "POST", path: "/project-artifact-configs", auth: true },
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

    const config = await db.queryRow<ProjectArtifactConfig>`
      INSERT INTO project_artifact_configs (
        project_id, size_tier, max_tokens_per_artifact, prd_tokens_used,
        constitution_tokens_used, architecture_tokens_used, schema_tokens_used
      )
      VALUES (
        ${req.project_id}, ${req.size_tier}, ${req.max_tokens_per_artifact || null},
        ${req.prd_tokens_used || 0}, ${req.constitution_tokens_used || 0},
        ${req.architecture_tokens_used || 0}, ${req.schema_tokens_used || 0}
      )
      ON CONFLICT (project_id) DO UPDATE SET
        size_tier = EXCLUDED.size_tier,
        max_tokens_per_artifact = EXCLUDED.max_tokens_per_artifact,
        prd_tokens_used = EXCLUDED.prd_tokens_used,
        constitution_tokens_used = EXCLUDED.constitution_tokens_used,
        architecture_tokens_used = EXCLUDED.architecture_tokens_used,
        schema_tokens_used = EXCLUDED.schema_tokens_used,
        updated_at = NOW()
      RETURNING project_id, size_tier, max_tokens_per_artifact, prd_tokens_used,
                constitution_tokens_used, architecture_tokens_used, schema_tokens_used,
                created_at, updated_at
    `;

    if (!config) {
      throw APIError.internal("failed to save artifact config");
    }

    return config;
  }
);
