CREATE TABLE messages (
  id CHAR(26) PRIMARY KEY,

  channel_id CHAR(26) NOT NULL
    REFERENCES channels(id)
    ON DELETE CASCADE,

  author_id CHAR(26)
    REFERENCES users(id)
    ON DELETE SET NULL,

  content TEXT NOT NULL DEFAULT '',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  edited_at TIMESTAMPTZ
);
