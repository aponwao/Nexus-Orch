import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import db from "../db";
import type { Project } from "./get";

interface ListProjectsParams {
  organization_id: Query<string>;
}

interface ListProjectsResponse {
  projects: Project[];
}

// Lists all projects for an organization.
export const list = api<ListProjectsParams, ListProjectsResponse>(
  { expose: true, method: "GET", path: "/projects", auth: true },
  async ({ organization_id }) => {
    const projects: Project[] = [];

    for await (const project of db.query<Project>`
      SELECT id, organization_id, name, description, builder_type,
             onboarding_step, onboarding_completed, github_repo_url,
             github_status, created_at, updated_at
      FROM projects
      WHERE organization_id = ${organization_id}
      ORDER BY created_at DESC
    `) {
      projects.push(project);
    }

    return { projects };
  }
);
