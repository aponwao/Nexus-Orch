export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  token_balance: number;
}

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  builder_type: string;
  onboarding_step: number;
  onboarding_completed: boolean;
}
