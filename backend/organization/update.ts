import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { Organization } from "./get";

interface UpdateOrganizationParams {
  id: string;
}

interface UpdateOrganizationRequest {
  id: string;
  clerk_org_id?: string;
  name?: string;
  slug?: string;
  plan?: string;
  token_balance?: number;
}

// Updates an existing organization.
export const update = api<UpdateOrganizationRequest, Organization>(
  { expose: true, method: "PUT", path: "/organizations/:id", auth: true },
  async (req) => {
    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    const { id, clerk_org_id, name, slug, plan, token_balance } = req;

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (clerk_org_id !== undefined) {
      updates.push(`clerk_org_id = $${paramIndex++}`);
      values.push(clerk_org_id);
    }
    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (slug !== undefined) {
      updates.push(`slug = $${paramIndex++}`);
      values.push(slug);
    }
    if (plan !== undefined) {
      updates.push(`plan = $${paramIndex++}`);
      values.push(plan);
    }
    if (token_balance !== undefined) {
      updates.push(`token_balance = $${paramIndex++}`);
      values.push(token_balance);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    values.push(authData.userID);

    const query = `
      UPDATE organizations
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
      RETURNING id, clerk_org_id, name, slug, plan, token_balance, created_at, updated_at
    `;

    try {
      const org = await db.rawQueryRow<Organization>(query, ...values);

      if (!org) {
        throw APIError.notFound("organization not found");
      }

      return org;
    } catch (err: any) {
      if (err.code === "23505") {
        if (err.constraint === "organizations_slug_key") {
          throw APIError.alreadyExists("organization with this slug already exists");
        }
        if (err.constraint === "organizations_clerk_org_id_key") {
          throw APIError.alreadyExists("organization with this clerk_org_id already exists");
        }
      }
      throw err;
    }
  }
);
