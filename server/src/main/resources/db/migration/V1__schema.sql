CREATE TABLE post (
    id serial NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    date timestamp not null,
    PRIMARY KEY (id)
);

INSERT INTO post (title, content, date) VALUES
('Title 1', 'Content 1', current_timestamp);
