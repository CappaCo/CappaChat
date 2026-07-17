CREATE TABLE users (
  id CHAR(26) PRIMARY KEY,

  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  description TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  password_hash TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
