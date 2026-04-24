-- Crear y usar la base de datos ejemplo_usuarios
CREATE DATABASE thor_db;
USE thor_db;

-- CENTRO
CREATE TABLE centro (
  id_centro INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  PRIMARY KEY (id_centro)
) ENGINE=INNODB;

-- MEMBRESIA
CREATE TABLE membresia (
  id_membresia INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  duracion_dias INT NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (id_membresia)
) ENGINE=INNODB;

-- USUARIO
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('socio','entrenador') NOT NULL,
  PRIMARY KEY (id_usuario)
) ENGINE=INNODB;

-- SOCIO
CREATE TABLE socio (
  id_socio INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  id_membresia INT NOT NULL,
  PRIMARY KEY (id_socio),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_membresia) REFERENCES membresia(id_membresia)
) ENGINE=INNODB;

-- ENTRENADOR
CREATE TABLE entrenador (
  id_entrenador INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100),
  id_centro INT NOT NULL,
  PRIMARY KEY (id_entrenador),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_centro) REFERENCES centro(id_centro)
) ENGINE=INNODB;

-- SALA
CREATE TABLE sala (
  id_sala INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_centro INT NOT NULL,
  PRIMARY KEY (id_sala),
  FOREIGN KEY (id_centro) REFERENCES centro(id_centro)
) ENGINE=INNODB;

-- ACTIVIDAD (SIN entrenador directo)
CREATE TABLE actividad (
  id_actividad INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  horario DATETIME NOT NULL,
  id_centro INT NOT NULL,
  id_sala INT NOT NULL,
  PRIMARY KEY (id_actividad),
  FOREIGN KEY (id_centro) REFERENCES centro(id_centro),
  FOREIGN KEY (id_sala) REFERENCES sala(id_sala)
) ENGINE=INNODB;

-- RELACIÓN N:M ENTRENADOR - ACTIVIDAD
CREATE TABLE entrenador_actividad (
  id_entrenador INT NOT NULL,
  id_actividad INT NOT NULL,
  PRIMARY KEY (id_entrenador, id_actividad),
  FOREIGN KEY (id_entrenador) REFERENCES entrenador(id_entrenador) ON DELETE CASCADE,
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad) ON DELETE CASCADE
) ENGINE=INNODB;

-- INSCRIPCION (N:M SOCIO - ACTIVIDAD)
CREATE TABLE inscripcion (
  id_socio INT NOT NULL,
  id_actividad INT NOT NULL,
  fecha_inscripcion DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id_socio, id_actividad),
  FOREIGN KEY (id_socio) REFERENCES socio(id_socio) ON DELETE CASCADE,
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad) ON DELETE CASCADE
) ENGINE=INNODB;

-- INSERTS de la tabla centro
INSERT INTO centro (nombre, direccion, telefono, email) VALUES
('Thor Fitness Madrid', 'Calle Gran Vía 25, Madrid', '911111111', 'madrid@thorfitness.com'),
('Thor Fitness Barcelona', 'Avenida Diagonal 120, Barcelona', '922222222', 'barcelona@thorfitness.com'),
('Thor Fitness Valencia', 'Calle Colón 18, Valencia', '933333333', 'valencia@thorfitness.com');

-- INSERTS de la tabla membresia
INSERT INTO membresia (nombre, duracion_dias, precio) VALUES
('Básica', 30, 29.99),
('Premium', 90, 79.99),
('Anual', 365, 249.99);

-- INSERTS de la tabla usuario
INSERT INTO usuario (email, telefono, password_hash, rol) VALUES
('juan@email.com', '600111111', 'hash123', 'socio'),
('maria@email.com', '600222222', 'hash123', 'socio'),
('pedro@email.com', '600333333', 'hash123', 'socio'),
('laura@email.com', '600444444', 'hash123', 'entrenador'),
('carlos@email.com', '600555555', 'hash123', 'entrenador');

-- INSERTS de la tabla socio
INSERT INTO socio (id_usuario, nombre, telefono, id_centro, id_membresia) VALUES
(1, 'JuanINSERTS Pérez', '600111111', 1, 1),
(2, 'María López', '600222222', 2, 2),
(3, 'Pedro Sánchez', '600333333', 3, 3);

-- INSERTS de la tabla entrenador
INSERT INTO entrenador (id_usuario, nombre, especialidad, id_centro) VALUES
(4, 'Laura Gómez', 'Crossfit', 1),
(5, 'Carlos Ruiz', 'Yoga', 2);

-- INSERTS de la tabla sala
INSERT INTO sala (nombre, id_centro) VALUES
('Sala Crossfit', 1),
('Sala Yoga', 2),
('Sala Cardio', 3);

-- INSERTS de la tabla actividad
INSERT INTO actividad (nombre, horario, id_centro, id_sala, id_entrenador) VALUES
('Crossfit Avanzado', '2026-05-01 10:00:00', 1, 1, 1),
('Yoga Relax', '2026-05-01 12:00:00', 2, 2, 2),
('Cardio Intenso', '2026-05-01 18:00:00', 3, 3, 1);

-- INSERTS de la tabla inscripcion
INSERT INTO inscripcion (id_socio, id_actividad, fecha_inscripcion) VALUES
(1, 1, '2026-04-20'),
(2, 2, '2026-04-21'),
(3, 3, '2026-04-22'),
(1, 3, '2026-04-22');