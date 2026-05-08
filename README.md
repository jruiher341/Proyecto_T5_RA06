## 👥 Integrantes

- Yeray
- Javier Ruiz Herrera

## 📋 Descripción

Thor es una aplicación web para gestionar una cadena de gimnasios. La idea es que tanto los socios como los entrenadores puedan entrar con su cuenta y ver la información que les corresponde: actividades, horarios, membresías, etc.

El objetivo es tener todo centralizado en una sola app en vez de llevar la gestión a mano o con hojas de cálculo.

Además, la aplicación contará con una API REST propia desarrollada desde cero con Node.js, encargada de gestionar toda la lógica de negocio y la comunicación entre el frontend y la base de datos.

## 🎯 Objetivos

- Crear una web con login que funcione según el rol del usuario.
- Gestionar socios, entrenadores, actividades y membresías desde la base de datos.
- Que cada usuario vea solo el dashboard que le corresponde según su rol.
- Desarrollar una API para centralizar peticiones y respuestas del sistema.

## ⚙️ Funcionalidades principales

- Registro e inicio de sesión con roles (socio / entrenador).
- Los socios pueden ver su membresía y apuntarse a actividades.
- Los entrenadores pueden ver las clases que imparten.
- Panel de administración para gestionar centros, salas y actividades.
- Consultar qué centros están abiertos en ese momento.
- Ver gimnasios por dirección.

## 👤 Tipos de usuarios

- **Socio**: cliente del gimnasio. Ve sus actividades y su membresía.
- **Entrenador**: trabajador del gimnasio. Ve las clases que tiene asignadas.
- **Administrador** *(pendiente)*: gestiona todo el sistema (no va a formar parte de la base de datos, será un usuario temporal para testear funciones).

## 🏗️ Estructura de la aplicación

**Frontend:** páginas HTML con CSS y JavaScript para que el usuario interactúe con la app.

**Backend:** API desarrollada desde cero con Node.js para gestionar autenticación y consultas a la base de datos.

**Base de datos:** MySQL con tablas para centros, usuarios, socios, entrenadores, salas, actividades, membresías e inscripciones.


## 🗄️ Base de datos

El fichero "thor_db.sql" contiene todas las tablas con sus relaciones y algunos datos de ejemplo para hacer pruebas.

Para importarla:

mysql -u root -p < thor_db.sql


## 🛠️ Tecnologías

- HTML, CSS, JavaScript
- MySQL
- Git / GitHub

## Control de cambios

### Añadido
- Se ha creado el docker-compose.yml para poder acceder al phpmyadmin y enlazar la base de datos ya creada.
- Endpoint GET /centros para listar los gimnasios desde la base de datos.
- Creación del index html con con el primer GET de la base de datos (siendo esta demostración de los centros solo una versión beta de la final).
- Creación del .dockerignore.
- Otras paginas y logo para la WEB (condiciones.html, gimnasios.html, sobre-nosotros.html y unete.html).

### Modificado
- Arreglo de relaciones y eliminación de tablas innecesarias para el proyecto de la base de datos.
- Estructura del proyecto: separación entre frontend y backend.
- Cambio de estructura de server.js a la carpeta backend.
- Corrección de las conexiones entre el backend y el frontend.

### Eliminado
- Tabla temporaltest, ya que no era necesaria para el funcionamiento del proyecto.
- La carpeta node_modules, ya que para no tener que cargarlo dentro del proyecto descargamos la imagen de node en el contenedor del proyecto en docker.

### Justificación de los cambios realizados
- Se han realizado estos cambios para adaptar la base de datos a las necesidades reales de la aplicación y comenzar la conexión entre frontend, backend y MySQL.
- .dockerignorepara que al ejecutar solo copie consigo los archivos correctos (así evitando tiempos de carga mas lentos por archivos que no van a ser procesador posteriormente en el cliente, como el .gitignore u otros..).




### ‼️ Esta es la idea básica y principal de la app, se ira añadiendo y modificando cosas durante el desarrollo.


