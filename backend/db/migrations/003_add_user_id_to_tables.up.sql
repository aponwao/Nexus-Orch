ALTER TABLE organizations ADD COLUMN user_id TEXT;
ALTER TABLE projects ADD COLUMN user_id TEXT;

CREATE INDEX idx_organizations_user_id ON organizations(user_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
