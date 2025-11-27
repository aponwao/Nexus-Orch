import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { Project } from "./get";

interface CreateProjectRequest {
  organization_id: string;
  name: string;
  description?: string;
  builder_type?: string;
  onboarding_step?: number;
  onboarding_completed?: boolean;
  github_repo_url?: string;
  github_status?: string;
}

// Creates a new project.
export const create = api<CreateProjectRequest, Project>(
  { expose: true, method: "POST", path: "/projects", auth: true },
  async (req) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const {
      organization_id,
      name,
      description,
      builder_type = "leap",
      onboarding_step = 1,
      onboarding_completed = false,
      github_repo_url,
      github_status = "disconnected",
    } = req;

    const org = await db.queryRow<{ id: string }>`
      SELECT id FROM organizations WHERE id = ${organization_id} AND user_id = ${authData.userID}
    `;
    if (!org) {
      throw APIError.notFound("organization not found");
    }

    try {
      const project = await db.queryRow<Project>`
        INSERT INTO projects (
          organization_id, name, description, builder_type,
          onboarding_step, onboarding_completed, github_repo_url, github_status, user_id
        )
        VALUES (
          ${organization_id}, ${name}, ${description ?? null}, ${builder_type},
          ${onboarding_step}, ${onboarding_completed}, ${github_repo_url ?? null}, ${github_status}, ${authData.userID}
        )
        RETURNING id, organization_id, name, description, builder_type,
                  onboarding_step, onboarding_completed, github_repo_url,
                  github_status, created_at, updated_at
      `;

      if (!project) {
        throw APIError.internal("failed to create project");
      }

      return project;
    } catch (err: any) {
      if (err.code === "23503") {
        throw APIError.invalidArgument("organization not found");
      }
      throw err;
    }
  }
);
