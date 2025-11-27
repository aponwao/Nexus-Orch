import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectArtifactConfig } from "./get";

interface UpdateProjectArtifactConfigRequest {
  projectId: string;
  size_tier?: string;
  max_tokens_per_artifact?: number;
  prd_tokens_used?: number;
  constitution_tokens_used?: number;
  architecture_tokens_used?: number;
  schema_tokens_used?: number;
}

export const update = api<UpdateProjectArtifactConfigRequest, ProjectArtifactConfig>(
  { expose: true, method: "PUT", path: "/project-artifact-configs/:projectId", auth: true },
  async ({ projectId, size_tier, max_tokens_per_artifact, prd_tokens_used, constitution_tokens_used, architecture_tokens_used, schema_tokens_used }) => {
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
      SELECT project_id FROM project_artifact_configs WHERE project_id = ${projectId}
    `;

    if (!existing) {
      throw APIError.notFound("artifact config not found");
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (size_tier !== undefined) {
      updates.push(`size_tier = $${paramIndex++}`);
      values.push(size_tier);
    }
    if (max_tokens_per_artifact !== undefined) {
      updates.push(`max_tokens_per_artifact = $${paramIndex++}`);
      values.push(max_tokens_per_artifact);
    }
    if (prd_tokens_used !== undefined) {
      updates.push(`prd_tokens_used = $${paramIndex++}`);
      values.push(prd_tokens_used);
    }
    if (constitution_tokens_used !== undefined) {
      updates.push(`constitution_tokens_used = $${paramIndex++}`);
      values.push(constitution_tokens_used);
    }
    if (architecture_tokens_used !== undefined) {
      updates.push(`architecture_tokens_used = $${paramIndex++}`);
      values.push(architecture_tokens_used);
    }
    if (schema_tokens_used !== undefined) {
      updates.push(`schema_tokens_used = $${paramIndex++}`);
      values.push(schema_tokens_used);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    values.push(projectId);

    const query = `
      UPDATE project_artifact_configs
      SET ${updates.join(", ")}
      WHERE project_id = $${paramIndex}
      RETURNING project_id, size_tier, max_tokens_per_artifact, prd_tokens_used,
                constitution_tokens_used, architecture_tokens_used, schema_tokens_used,
                created_at, updated_at
    `;

    const config = await db.rawQueryRow<ProjectArtifactConfig>(query, ...values);

    if (!config) {
      throw APIError.internal("failed to update artifact config");
    }

    return config;
  }
);
