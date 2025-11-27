CREATE TABLE project_contexts (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  primary_users JSONB,
  primary_users_comments TEXT,
  critical_actions JSONB,
  critical_actions_comments TEXT,
  builders JSONB,
  builders_comments TEXT,
  required_capabilities JSONB,
  capabilities_comments TEXT,
  user_structure TEXT,
  user_structure_comments TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_project_contexts_project_id ON project_contexts(project_id);
