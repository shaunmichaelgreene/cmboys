CREATE TABLE teams (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  rank INT NOT NULL,
  wins INT NOT NULL,
  losses INT NOT NULL,
  ties INT NOT NULL,
  points_for FLOAT NOT NULL,
  points_against FLOAT NOT NULL,
  PRIMARY KEY (id)
);