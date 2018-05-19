 
 
CREATE TABLE post(
	
    id int NOT NULL AUTO_INCREMENT,
	title varchar(200),
    small_desc varchar(550),
    content text,
    status tinyint default 0,
    category varchar(200),
    published_on datetime,
    img varchar(300),
    user_id varchar(50), 
	PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(username)
);