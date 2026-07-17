CREATE TABLE channels (
  id CHAR(26) PRIMARY KEY,

  server_id CHAR(26) NOT NULL
    REFERENCES servers(id)
    ON DELETE CASCADE,

  name TEXT NOT NULL,
  type TEXT NOT NULL,
  position INTEGER NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (server_id, name)
);
