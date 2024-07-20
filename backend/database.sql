CREATE DATABASE admin_panel;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  dob DATE,
  gender VARCHAR(10),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  dob DATE,
  gender VARCHAR(10),
  address TEXT,
  first_release_year INT,
  no_of_albums_released INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE music (
  id SERIAL PRIMARY KEY,
  artist_id INT REFERENCES artists(id),
  title VARCHAR(255),
  album_name VARCHAR(255),
  genre VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address)
VALUES 
('Sailesh', 'Ghimire', 'sailesh@gmail.com', 'password', '9800000000', '2002-02-27', 'male', 'Lalitpur'),
('test', 'test', 'test@gmail.com', 'test123', '9800000001', '2000-02-02', 'female', 'Kathmandu');

INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released)
VALUES 
('Artist One', '1980-03-03', 'male', 'USA', 2000, 5),
('Artist Two', '1985-04-04', 'female', 'USA', 2005, 3);

INSERT INTO music (artist_id, title, album_name, genre)
VALUES 
(1, 'Song One', 'Album One', 'Rock'),
(2, 'Song Two', 'Album Two', 'Pop');