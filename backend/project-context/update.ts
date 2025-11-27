import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { ProjectContext } from "./get";

interface UpdateProjectContextRequest {
  projectId: string;
  primary_users?: any;
  primary_users_comments?: string;
  critical_actions?: any;
  critical_actions_comments?: string;
  builders?: any;
  builders_comments?: string;
  required_capabilities?: any;
  capabilities_comments?: string;
  user_structure?: string;
  user_structure_comments?: string;
}

export const update = api<UpdateProjectContextRequest, ProjectContext>(
  { expose: true, method: "PUT", path: "/project-contexts/:projectId", auth: true },
  async (req) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const {
      projectId,
      primary_users,
      primary_users_comments,
      critical_actions,
      critical_actions_comments,
      builders,
      builders_comments,
      required_capabilities,
      capabilities_comments,
      user_structure,
      user_structure_comments,
    } = req;

    const project = await db.queryRow<{ user_id: string }>`
      SELECT user_id FROM projects WHERE id = ${projectId}
    `;

    if (!project || project.user_id !== authData.userID) {
      throw APIError.permissionDenied("project not found or access denied");
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (primary_users !== undefined) {
      updates.push(`primary_users = $${paramIndex++}`);
      values.push(primary_users);
    }
    if (primary_users_comments !== undefined) {
      updates.push(`primary_users_comments = $${paramIndex++}`);
      values.push(primary_users_comments);
    }
    if (critical_actions !== undefined) {
      updates.push(`critical_actions = $${paramIndex++}`);
      values.push(critical_actions);
    }
    if (critical_actions_comments !== undefined) {
      updates.push(`critical_actions_comments = $${paramIndex++}`);
      values.push(critical_actions_comments);
    }
    if (builders !== undefined) {
      updates.push(`builders = $${paramIndex++}`);
      values.push(builders);
    }
    if (builders_comments !== undefined) {
      updates.push(`builders_comments = $${paramIndex++}`);
      values.push(builders_comments);
    }
    if (required_capabilities !== undefined) {
      updates.push(`required_capabilities = $${paramIndex++}`);
      values.push(required_capabilities);
    }
    if (capabilities_comments !== undefined) {
      updates.push(`capabilities_comments = $${paramIndex++}`);
      values.push(capabilities_comments);
    }
    if (user_structure !== undefined) {
      updates.push(`user_structure = $${paramIndex++}`);
      values.push(user_structure);
    }
    if (user_structure_comments !== undefined) {
      updates.push(`user_structure_comments = $${paramIndex++}`);
      values.push(user_structure_comments);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(projectId);

    const query = `
      UPDATE project_contexts
      SET ${updates.join(", ")}
      WHERE project_id = $${paramIndex}
      RETURNING project_id, primary_users, primary_users_comments,
                critical_actions, critical_actions_comments, builders,
                builders_comments, required_capabilities, capabilities_comments,
                user_structure, user_structure_comments, created_at, updated_at
    `;

    const context = await db.rawQueryRow<ProjectContext>(query, ...values);

    if (!context) {
      throw APIError.notFound("project context not found");
    }

    return context;
  }
);
