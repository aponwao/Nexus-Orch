import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

interface GetProjectArtifactConfigParams {
  projectId: string;
}

export interface ProjectArtifactConfig {
  project_id: string;
  size_tier: string;
  max_tokens_per_artifact: number | null;
  prd_tokens_used: number;
  constitution_tokens_used: number;
  architecture_tokens_used: number;
  schema_tokens_used: number;
  created_at: Date;
  updated_at: Date;
}

export const get = api<GetProjectArtifactConfigParams, ProjectArtifactConfig>(
  { expose: true, method: "GET", path: "/project-artifact-configs/:projectId", auth: true },
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

    const config = await db.queryRow<ProjectArtifactConfig>`
      SELECT project_id, size_tier, max_tokens_per_artifact, prd_tokens_used,
             constitution_tokens_used, architecture_tokens_used, schema_tokens_used,
             created_at, updated_at
      FROM project_artifact_configs
      WHERE project_id = ${projectId}
    `;

    if (!config) {
      throw APIError.notFound("artifact config not found");
    }

    return config;
  }
);
