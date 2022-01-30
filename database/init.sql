BEGIN;

CREATE TABLE post (
id SERIAL PRIMARY KEY,
content TEXT NOT NULL,
signature VARCHAR(64) NOT NULL,
created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE token (
id SERIAL PRIMARY KEY,
token VARCHAR(255) UNIQUE NOT NULL
);

COMMIT;