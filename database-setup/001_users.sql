CREATE TABLE users (
  id CHAR(26) PRIMARY KEY,

  username TEXT NOT NULL UNIQUE,
  display_name TEXT, -- dont' do this
  description TEXT NOT NULL DEFAULT '',
  avatar_url TEXT, -- renamed to profile_picture_url
  password_hash TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE users
RENAME COLUMN avatar_url to profile_picture_url;

ALTER TABLE users
DROP COLUMN display_name;
