CREATE TABLE sessions (
    id CHAR(26) PRIMARY KEY,
    token_hash CHAR(64) NOT NULL UNIQUE, -- UNIQUE speeds up SELECT which will be happening more often than INSERT
    user_id CHAR(26) NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
