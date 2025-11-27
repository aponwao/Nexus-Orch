CREATE TABLE project_artifact_configs (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  size_tier TEXT NOT NULL,
  max_tokens_per_artifact INTEGER,
  prd_tokens_used INTEGER NOT NULL DEFAULT 0,
  constitution_tokens_used INTEGER NOT NULL DEFAULT 0,
  architecture_tokens_used INTEGER NOT NULL DEFAULT 0,
  schema_tokens_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_artifact_configs_project_id ON project_artifact_configs(project_id);
