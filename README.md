# ⚡ Thor — Sistema de Gestión de Gimnasios

## 👥 Integrantes

- Yeray
- Javier Ruiz Herrera



## 📋 Descripción

Thor es una aplicación web para gestionar una cadena de gimnasios. La idea es que tanto los socios como los entrenadores puedan entrar con su cuenta y ver la información que les corresponde: actividades, horarios, membresías, etc.

El objetivo es tener todo centralizado en una sola app en vez de llevar la gestión a mano o con hojas de cálculo.



## 🎯 Objetivos

- Crear una web con login que funcione según el rol del usuario.
- Gestionar socios, entrenadores, actividades y membresías desde una base de datos.
- Que cada usuario vea solo lo que le corresponde según su rol.


## ⚙️ Funcionalidades principales

- Registro e inicio de sesión con roles (socio / entrenador).
- Los socios pueden ver su membresía y apuntarse a actividades.
- Los entrenadores pueden ver las clases que imparten.
- Panel de administración para gestionar centros, salas y actividades.
- Consultar qué centros están abiertos en ese momento.


## 👤 Tipos de usuarios

- **Socio**: cliente del gimnasio. Ve sus actividades y su membresía.
- **Entrenador**: trabajador del gimnasio. Ve las clases que tiene asignadas.
- **Administrador** *(pendiente)*: gestiona todo el sistema.


## 🏗️ Estructura de la aplicación

**Frontend:** páginas HTML con CSS y JavaScript para que el usuario interactúe con la app.

**Backend:** Java.

**Base de datos:** MySQL con tablas para centros, usuarios, socios, entrenadores, salas, actividades, membresías e inscripciones.


## 🗄️ Base de datos

El fichero "thor_db.sql" contiene todas las tablas con sus relaciones y algunos datos de ejemplo para hacer pruebas.

Para importarla:

mysql -u root -p < thor_db.sql


## 🛠️ Tecnologías

- HTML, CSS, JavaScript
- MySQL
- Git / GitHub
