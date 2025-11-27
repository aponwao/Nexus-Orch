import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Project } from "./get";

interface UpdateStepRequest {
  id: string;
  onboarding_step: number;
}

// Updates only the onboarding step for a project.
export const updateStep = api<UpdateStepRequest, Project>(
  { expose: true, method: "PATCH", path: "/projects/:id/step", auth: true },
  async ({ id, onboarding_step }) => {
    const project = await db.queryRow<Project>`
      UPDATE projects
      SET onboarding_step = ${onboarding_step}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, organization_id, name, description, builder_type,
                onboarding_step, onboarding_completed, github_repo_url,
                github_status, created_at, updated_at
    `;

    if (!project) {
      throw APIError.notFound("project not found");
    }

    return project;
  }
);
