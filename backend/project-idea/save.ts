import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { ProjectIdea } from "./get";

interface SaveProjectIdeaRequest {
  project_id: string;
  raw_idea: string;
  problems?: any;
  problems_comments?: string;
  target_users?: any;
  target_users_comments?: string;
  current_solutions?: any;
  current_solutions_comments?: string;
  differentiators?: any;
  differentiators_comments?: string;
  summary?: string;
}

export const save = api<SaveProjectIdeaRequest, ProjectIdea>(
  { expose: true, method: "POST", path: "/project-ideas", auth: true },
  async (req) => {
    const {
      project_id,
      raw_idea,
      problems,
      problems_comments,
      target_users,
      target_users_comments,
      current_solutions,
      current_solutions_comments,
      differentiators,
      differentiators_comments,
      summary,
    } = req;

    try {
      const idea = await db.queryRow<ProjectIdea>`
        INSERT INTO project_ideas (
          project_id, raw_idea, problems, problems_comments,
          target_users, target_users_comments, current_solutions,
          current_solutions_comments, differentiators, differentiators_comments,
          summary
        )
        VALUES (
          ${project_id}, ${raw_idea}, ${problems ?? null}, ${problems_comments ?? null},
          ${target_users ?? null}, ${target_users_comments ?? null}, ${current_solutions ?? null},
          ${current_solutions_comments ?? null}, ${differentiators ?? null}, ${differentiators_comments ?? null},
          ${summary ?? null}
        )
        RETURNING project_id, raw_idea, problems, problems_comments,
                  target_users, target_users_comments, current_solutions,
                  current_solutions_comments, differentiators, differentiators_comments,
                  summary, created_at, updated_at
      `;

      if (!idea) {
        throw APIError.internal("failed to save project idea");
      }

      return idea;
    } catch (err: any) {
      if (err.code === "23503") {
        throw APIError.invalidArgument("project not found");
      }
      if (err.code === "23505") {
        throw APIError.alreadyExists("project idea already exists");
      }
      throw err;
    }
  }
);
