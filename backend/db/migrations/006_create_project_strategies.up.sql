CREATE TABLE project_strategies (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  modules JSONB,
  modules_comments TEXT,
  architecture_decisions JSONB,
  infrastructure_decisions JSONB,
  total_estimated_cost_min DECIMAL(10, 2),
  total_estimated_cost_max DECIMAL(10, 2),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_strategies_project_id ON project_strategies(project_id);
