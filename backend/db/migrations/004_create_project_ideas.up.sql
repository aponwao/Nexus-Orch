CREATE TABLE project_ideas (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  raw_idea TEXT NOT NULL,
  problems JSONB,
  problems_comments TEXT,
  target_users JSONB,
  target_users_comments TEXT,
  current_solutions JSONB,
  current_solutions_comments TEXT,
  differentiators JSONB,
  differentiators_comments TEXT,
  summary TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_project_ideas_project_id ON project_ideas(project_id);
