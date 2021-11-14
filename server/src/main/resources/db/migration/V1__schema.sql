CREATE TABLE post
(
    id serial NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created timestamp not null,
    PRIMARY KEY (id)
);
