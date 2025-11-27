import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { Project } from "./get";

interface UpdateProjectRequest {
  id: string;
  name?: string;
  description?: string;
  builder_type?: string;
  onboarding_step?: number;
  onboarding_completed?: boolean;
  github_repo_url?: string;
  github_status?: string;
}

// Updates an existing project.
export const update = api<UpdateProjectRequest, Project>(
  { expose: true, method: "PUT", path: "/projects/:id", auth: true },
  async (req) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const {
      id,
      name,
      description,
      builder_type,
      onboarding_step,
      onboarding_completed,
      github_repo_url,
      github_status,
    } = req;

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (builder_type !== undefined) {
      updates.push(`builder_type = $${paramIndex++}`);
      values.push(builder_type);
    }
    if (onboarding_step !== undefined) {
      updates.push(`onboarding_step = $${paramIndex++}`);
      values.push(onboarding_step);
    }
    if (onboarding_completed !== undefined) {
      updates.push(`onboarding_completed = $${paramIndex++}`);
      values.push(onboarding_completed);
    }
    if (github_repo_url !== undefined) {
      updates.push(`github_repo_url = $${paramIndex++}`);
      values.push(github_repo_url);
    }
    if (github_status !== undefined) {
      updates.push(`github_status = $${paramIndex++}`);
      values.push(github_status);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    values.push(authData.userID);

    const query = `
      UPDATE projects
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
      RETURNING id, organization_id, name, description, builder_type,
                onboarding_step, onboarding_completed, github_repo_url,
                github_status, created_at, updated_at
    `;

    const project = await db.rawQueryRow<Project>(query, ...values);

    if (!project) {
      throw APIError.notFound("project not found");
    }

    return project;
  }
);
