# Reparto de tareas - Proyecto Thor Fitness

**Equipo:** Yeray y Javier
**Módulo:** Lenguajes de Marcas y Sistemas de Gestión de Información (LMSGI)
**RA 6:** Gestión de información y creación de API con MySQL y Node.js

Para asegurar un aprendizaje integral y cumplir con los requisitos del proyecto, el trabajo se ha dividido de forma equitativa de la siguiente manera:

## 👤 Javier
### Backend (API REST)
- **Configuración del servidor:** Instalación de dependencias (express, mysql2, cors) y estructura inicial de `backend/server.js`.
- **Endpoint GET:** Implementación de la ruta para obtener la lista de actividades/máquinas desde MySQL.
- **Conexión DB:** Configuración del objeto de conexión y gestión de errores de acceso a la base de datos.

### Frontend
- **Maquetación HTML:** Creación de la estructura semántica de `index.html` (Header, Main, Footer).
- **Consumo de API:** Escritura de la función `fetch()` inicial para conectar con el backend y recuperación de datos JSON.

---

## 👤 Yeray
### Base de Datos y Documentación
- **Modelo de Datos:** Creación del archivo SQL con las tablas necesarias y datos de prueba.
- **Entorno WSL:** Configuración del servidor MySQL en Debian y gestión de permisos del usuario 'profesor'.
- **Documentación:** Redacción del `README.md` (Control de cambios) y comentarios de código en formato Doxygen.

### Frontend y Diseño
- **Estilos CSS:** Diseño visual de la interfaz (colores, tipografía Inter, layout con Flexbox/Grid) y animaciones de botones.
- **Manipulación del DOM:** Lógica en `javascript.js` para pintar dinámicamente en el HTML los datos recibidos mediante los `.then()` del fetch.

---

## Tareas compartidas (Sincronización)
- **Depuración:** Pruebas conjuntas del flujo completo (Frontend <-> Backend <-> MySQL).
- **Git:** Gestión de ramas y resolución de conflictos en el repositorio compartido ya que se hizo ramas de prueba que despues fueron implementadas a la principal.
- **Revisión final:** Comprobación de que se cumplen todos los requisitos técnicos del RA 6.
