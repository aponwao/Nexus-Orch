import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";
import type { Organization } from "./get";

interface CreateOrganizationRequest {
  clerk_org_id?: string;
  name: string;
  slug: string;
  plan?: string;
  token_balance?: number;
}

// Creates a new organization.
export const create = api<CreateOrganizationRequest, Organization>(
  { expose: true, method: "POST", path: "/organizations", auth: true },
  async (req) => {
    const {
      clerk_org_id,
      name,
      slug,
      plan = "free",
      token_balance = 0,
    } = req;

    const authData = getAuthData();
    if (!authData) {
      throw APIError.unauthenticated("authentication required");
    }

    try {
      const org = await db.queryRow<Organization>`
        INSERT INTO organizations (clerk_org_id, name, slug, plan, token_balance, user_id)
        VALUES (${clerk_org_id ?? null}, ${name}, ${slug}, ${plan}, ${token_balance}, ${authData.userID})
        RETURNING id, clerk_org_id, name, slug, plan, token_balance, created_at, updated_at
      `;

      if (!org) {
        throw APIError.internal("failed to create organization");
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
