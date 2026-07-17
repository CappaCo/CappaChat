CREATE TABLE members (
  user_id CHAR(26) NOT NULL REFERENCES users(id),
  server_id CHAR(26) NOT NULL REFERENCES servers(id),

  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, server_id)
);
