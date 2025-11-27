import { api, APIError } from "encore.dev/api";
import db from "../db";

interface GetProjectParams {
  id: string;
}

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  builder_type: string;
  onboarding_step: number;
  onboarding_completed: boolean;
  github_repo_url: string | null;
  github_status: string;
  created_at: Date;
  updated_at: Date;
}

// Retrieves a project by ID.
export const get = api<GetProjectParams, Project>(
  { expose: true, method: "GET", path: "/projects/:id", auth: true },
  async ({ id }) => {
    const project = await db.queryRow<Project>`
      SELECT id, organization_id, name, description, builder_type,
             onboarding_step, onboarding_completed, github_repo_url,
             github_status, created_at, updated_at
      FROM projects
      WHERE id = ${id}
    `;

    if (!project) {
      throw APIError.notFound("project not found");
    }

    return project;
  }
);
