CREATE TABLE stuff (
    id SERIAL PRIMARY KEY,
    stuff VARCHAR(128),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP NULL,
    date_deleted TIMESTAMP NULL
);