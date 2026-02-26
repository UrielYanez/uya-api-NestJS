-- MySQL
CREATE TABLE users(
    id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(250) NOT NULL
);

CREATE TABLE tasks(
    id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    priority BOOLEAN NOT NULL,
    user_id SMALLINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertar un usuario
INSERT INTO users (name, lastname) VALUES ('Uriel', 'Yáñez');

-- Insertar dos tareas
INSERT INTO tasks (name, description, priority, user_id) VALUES 
('Terminar Evaluación', 'Instrumento Base de Datos', true, 1),
('Comprar Mochila', 'Comprar Mochila Nueva', false, 1);


----------------------------------------------------------------------
-- PostgreSQL
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(250) NOT NULL
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    priority bool NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

-- Insertar un usuario
INSERT INTO users (name, lastname) VALUES ('Uriel', 'Yáñez');

-- Insertar dos tareas
INSERT INTO tasks (name, description, priority, user_id) VALUES 
('Terminar Evaluación', 'Instrumento Base de Datos', true, 1),
('Comprar Mochila', 'Comprar Mochila Nueva', false, 1);