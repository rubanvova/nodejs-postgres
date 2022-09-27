create TABLE person(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  email VARCHAR (255) UNIQUE NOT NULL,
  password VARCHAR (100),
  created_on TIMESTAMP NOT NULL
);

create TABLE todos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES person (id)
);


