CREATE TABLE project_llm_configs (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  orchestrator_llm TEXT NOT NULL,
  orchestrator_model TEXT NOT NULL,
  fallback_llm TEXT,
  max_tokens_per_task INTEGER NOT NULL DEFAULT 4000,
  temperature DECIMAL(3, 2) NOT NULL DEFAULT 0.7,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_llm_configs_project_id ON project_llm_configs(project_id);
