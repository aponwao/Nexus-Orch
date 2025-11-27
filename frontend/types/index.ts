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

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export interface StepConfig {
  id: OnboardingStep;
  name: string;
  description: string;
  isCompleted: boolean;
}

export interface ProjectIdea {
  raw_idea: string;
  problems: string[];
  problems_comments: string;
  target_users: string[];
  target_users_comments: string;
  current_solutions: string[];
  current_solutions_comments: string;
  differentiators: string[];
  differentiators_comments: string;
  summary: string;
}

export interface ProjectContext {
  primary_users: string[];
  primary_users_comments: string;
  critical_actions: string[];
  critical_actions_comments: string;
  builders: string[];
  builders_comments: string;
  required_capabilities: string[];
  capabilities_comments: string;
  user_structure: string;
  user_structure_comments: string;
}

export interface ProjectStrategy {
  modules: any[];
  modules_comments: string;
  architecture_decisions: any;
  infrastructure_decisions: any;
  total_estimated_cost_min: number;
  total_estimated_cost_max: number;
}
