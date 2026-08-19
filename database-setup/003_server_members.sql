CREATE TABLE members (
  user_id CHAR(26) NOT NULL REFERENCES users(id),
  server_id CHAR(26) NOT NULL REFERENCES servers(id),

  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, server_id)
);

BEGIN;

ALTER TABLE members
    DROP CONSTRAINT members_user_id_fkey;

ALTER TABLE members 
    ADD CONSTRAINT members_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES users (id) 
    ON DELETE CASCADE;

COMMIT;


BEGIN;

ALTER TABLE members
    DROP CONSTRAINT members_server_id_fkey;

ALTER TABLE members 
    ADD CONSTRAINT members_server_id_fkey 
    FOREIGN KEY (server_id) 
    REFERENCES servers (id) 
    ON DELETE CASCADE;

COMMIT;
