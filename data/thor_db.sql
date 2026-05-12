CREATE DATABASE IF NOT EXISTS thor_db;
USE thor_db;

-- 1. Tabla: centro
CREATE TABLE centro (
    CodCen INT NOT NULL AUTO_INCREMENT,
    CenNom VARCHAR(100),
    CenDir VARCHAR(200),
    CenEma VARCHAR(100),
    CenTel VARCHAR(20),
    CenHor VARCHAR(45),
    PRIMARY KEY (CodCen)
) ENGINE=InnoDB;

-- 2. Tabla: membresia
CREATE TABLE membresia (
    CodMem INT NOT NULL AUTO_INCREMENT,
    MemNom VARCHAR(100),
    MemDur INT,
    MemPre DECIMAL(35, 2), -- Ajustado con decimales para moneda
    PRIMARY KEY (CodMem)
) ENGINE=InnoDB;

-- 3. Tabla: usuario
-- Nota: Esta tabla es central para 'entrenador' y 'socio'
CREATE TABLE usuario (
    CodUsu INT NOT NULL AUTO_INCREMENT,
    UsuCon VARCHAR(255),
    UsuTel VARCHAR(20),
    UsuEma VARCHAR(150),
    UsuNom VARCHAR(45),
    UsuApe VARCHAR(45),
    UsuRol VARCHAR(45),
    UsuDNI VARCHAR(45),
    PRIMARY KEY (CodUsu)
) ENGINE=InnoDB;

-- 4. Tabla: entrenador
-- Relaciona centro y usuario
CREATE TABLE entrenador (
    EntEsp VARCHAR(100),
    usuario_CodUsu INT NOT NULL,
    centro_CodCen INT NOT NULL,
    PRIMARY KEY (usuario_CodUsu),
    CONSTRAINT fk_entrenador_usuario
        FOREIGN KEY (usuario_CodUsu)
        REFERENCES usuario (CodUsu)
        ON DELETE CASCADE,
    CONSTRAINT fk_entrenador_centro
        FOREIGN KEY (centro_CodCen)
        REFERENCES centro (CodCen)
) ENGINE=InnoDB;

-- 5. Tabla: socio
-- Relaciona usuario y membresia
CREATE TABLE socio (
    usuario_CodUsu INT NOT NULL,
    membresia_CodMem INT NOT NULL,
    PRIMARY KEY (usuario_CodUsu),
    CONSTRAINT fk_socio_usuario
        FOREIGN KEY (usuario_CodUsu)
        REFERENCES usuario (CodUsu)
        ON DELETE CASCADE,
    CONSTRAINT fk_socio_membresia
        FOREIGN KEY (membresia_CodMem)
        REFERENCES membresia (CodMem)
) ENGINE=InnoDB;

-- VALORES --

-- 1. Insertar Centros
INSERT INTO centro (CenNom, CenDir, CenEma, CenTel, CenHor) VALUES 
('Gym Central', 'Av. Principal 123', 'contacto@gymcentral.com', '912345678', '06:00 - 22:00'),
('Fitness Norte', 'Calle Norte 45', 'info@fitnorte.com', '987654321', '08:00 - 20:00');

-- 2. Insertar Membresías
INSERT INTO membresia (MemNom, MemDur, MemPre) VALUES 
('Plan Básico', 30, 29.99),
('Plan Premium', 90, 75.50),
('Plan Anual VIP', 365, 250.00);

-- 3. Insertar Usuarios
-- Crearemos 4 usuarios: 2 entrenadores y 2 socios
INSERT INTO usuario (UsuCon, UsuTel, UsuEma, UsuNom, UsuApe, UsuRol, UsuDNI) VALUES 
('pass123', '600111222', 'carlos.ent@email.com', 'Carlos', 'García', 'Entrenador', '12345678A'),
('pass456', '600333444', 'elena.ent@email.com', 'Elena', 'Pérez', 'Entrenador', '87654321B'),
('pass789', '600555666', 'juan.socio@email.com', 'Juan', 'López', 'Socio', '11223344C'),
('pass000', '600777888', 'marta.socia@email.com', 'Marta', 'Ruiz', 'Socio', '44332211D');

-- 4. Insertar Entrenadores
-- Carlos (CodUsu 1) trabaja en el centro 1
-- Elena (CodUsu 2) trabaja en el centro 2
INSERT INTO entrenador (EntEsp, usuario_CodUsu, centro_CodCen) VALUES 
('Musculación y Powerlifting', 1, 1),
('Yoga y Pilates', 2, 2);

-- 5. Insertar Socios
-- Juan (CodUsu 3) tiene membresía Básica (CodMem 1)
-- Marta (CodUsu 4) tiene membresía Premium (CodMem 2)
INSERT INTO socio (usuario_CodUsu, membresia_CodMem) VALUES 
(3, 1),
(4, 2);
CREATE TABLE IF NOT EXISTS socios (
    id_socio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20),
    id_membresia INT
);