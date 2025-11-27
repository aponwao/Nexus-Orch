import { api, APIError } from "encore.dev/api";
import db from "../db";

interface GetOrganizationParams {
  id: string;
}

export interface Organization {
  id: string;
  clerk_org_id: string | null;
  name: string;
  slug: string;
  plan: string;
  token_balance: number;
  created_at: Date;
  updated_at: Date;
}

// Retrieves an organization by ID.
export const get = api<GetOrganizationParams, Organization>(
  { expose: true, method: "GET", path: "/organizations/:id", auth: true },
  async ({ id }) => {
    const org = await db.queryRow<Organization>`
      SELECT id, clerk_org_id, name, slug, plan, token_balance, created_at, updated_at
      FROM organizations
      WHERE id = ${id}
    `;

    if (!org) {
      throw APIError.notFound("organization not found");
    }

    return org;
  }
);
