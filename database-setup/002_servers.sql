CREATE TABLE servers (
  id CHAR(26) PRIMARY KEY,
  owner_id CHAR(26) NOT NULL REFERENCES users(id),

  name TEXT NOT NULL,
  icon_url TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
