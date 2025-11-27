import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { ProjectIdea } from "./get";

interface UpdateProjectIdeaRequest {
  projectId: string;
  raw_idea?: string;
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

export const update = api<UpdateProjectIdeaRequest, ProjectIdea>(
  { expose: true, method: "PUT", path: "/project-ideas/:projectId", auth: true },
  async (req) => {
    const {
      projectId,
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

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (raw_idea !== undefined) {
      updates.push(`raw_idea = $${paramIndex++}`);
      values.push(raw_idea);
    }
    if (problems !== undefined) {
      updates.push(`problems = $${paramIndex++}`);
      values.push(problems);
    }
    if (problems_comments !== undefined) {
      updates.push(`problems_comments = $${paramIndex++}`);
      values.push(problems_comments);
    }
    if (target_users !== undefined) {
      updates.push(`target_users = $${paramIndex++}`);
      values.push(target_users);
    }
    if (target_users_comments !== undefined) {
      updates.push(`target_users_comments = $${paramIndex++}`);
      values.push(target_users_comments);
    }
    if (current_solutions !== undefined) {
      updates.push(`current_solutions = $${paramIndex++}`);
      values.push(current_solutions);
    }
    if (current_solutions_comments !== undefined) {
      updates.push(`current_solutions_comments = $${paramIndex++}`);
      values.push(current_solutions_comments);
    }
    if (differentiators !== undefined) {
      updates.push(`differentiators = $${paramIndex++}`);
      values.push(differentiators);
    }
    if (differentiators_comments !== undefined) {
      updates.push(`differentiators_comments = $${paramIndex++}`);
      values.push(differentiators_comments);
    }
    if (summary !== undefined) {
      updates.push(`summary = $${paramIndex++}`);
      values.push(summary);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(projectId);

    const query = `
      UPDATE project_ideas
      SET ${updates.join(", ")}
      WHERE project_id = $${paramIndex}
      RETURNING project_id, raw_idea, problems, problems_comments,
                target_users, target_users_comments, current_solutions,
                current_solutions_comments, differentiators, differentiators_comments,
                summary, created_at, updated_at
    `;

    const idea = await db.rawQueryRow<ProjectIdea>(query, ...values);

    if (!idea) {
      throw APIError.notFound("project idea not found");
    }

    return idea;
  }
);
