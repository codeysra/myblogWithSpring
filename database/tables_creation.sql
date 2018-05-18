USE blog;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	username VARCHAR(50) NOT NULL ,
	password VARCHAR(50) NOT NULL ,
	enabled SMALLINT NOT NULL DEFAULT 1,
	PRIMARY KEY (username)
);

create table authorities(
    username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);