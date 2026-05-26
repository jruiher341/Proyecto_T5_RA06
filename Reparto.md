# Reparto de tareas - Proyecto Thor Fitness

**Equipo:** Yeray y Javier
**Módulo:** Lenguajes de Marcas y Sistemas de Gestión de Información (LMSGI)
**RA 6:** Gestión de información y creación de API con MySQL y Node.js

Para asegurar un aprendizaje integral y cumplir con los requisitos del proyecto, el trabajo se ha dividido de forma equitativa de la siguiente manera:

## 👤 Yeray

- **Configuración del servidor:** Instalación de dependencias básicas y estructura inicial del archivo `backend/server.js` levantando el servidor Express en el puerto 3000.
- **Conexión DB:** Configuración del objeto de conexión mediante un `mysql.createPool` apuntando a `thor_db`, asegurando una gestión eficiente de conexiones simultáneas y control de fallos críticos en el arranque.
- **Endpoints del CRUD de Socios:** Implementación en el backend de las rutas principales para interactuar con la tabla `usuario`:
  - `POST /socios`: Registros iniciales automáticos con contraseña y DNI por defecto.
  - `GET /socios`: Consulta con filtrado específico para extraer únicamente los perfiles con rol de "Socio".
  - `PUT /socios/:id`: Lógica de actualización de datos en caliente filtrando por el identificador único `CodUsu`.
- **Documentación y Gestión de Entorno:** Inicialización del repositorio Git, control lineal de versiones (`v1.0` a `v1.12`) y redacción del histórico de cambios.
- **Sección Corporativa Multimedia:** Maquetación HTML extendida y redacción de contenidos en `src/pages/sobre-nosotros.html` (misión, visión, hitos de la cadena y perfiles de los fundadores). Carga y estructuración en el repositorio de todo el paquete multimedia de imágenes del gimnasio, entrenamientos y avatares.

---

## 👤 Javier

- **Maquetación HTML Semántica:** Creación de la estructura base común, el menú de navegación y la sección principal *Hero* con llamadas a la acción (*Call to Action*) en `src/index.html`. Estructuración por etiquetas `<fieldset>` y validación de formularios de suscripción y accesos en `login.html`, `membresias.html` y `gimnasios.html`.
- **Consumo de API Dinámico (Fetch):** Escritura de las funciones asíncronas en `src/js/javascript.js` para conectar con el backend y procesar las respuestas JSON. Intercepción del envío de formularios con `event.preventDefault()` y conversión de datos mediante `JSON.stringify()`.
- **Renderizado del DOM y Mapas:** Creación de la lógica en JavaScript para inyectar dinámicamente tarjetas mediante *Template Literals*. Implementación de la función de carga de gimnasios consumiendo `/api/centros` y renderizado de un mapa dinámico individual embebido con `iframe` codificando la dirección del local en tiempo real con `encodeURIComponent`.
- **Endpoints de Módulos Auxiliares:** Ampliación del servidor backend para soportar la lógica de negocio de los planes deportivos:
  - `GET /api/membresia`: Ruta para extraer las tarifas y duraciones de la base de datos.
  - `POST /api/membresia/asignar`: Gestión del registro de contratos en la tabla intermedia de relaciones.
- **Implementación del Borrado Físico (CRUD completo):** Creación e integración de la rama `Codigo-boton-borrar` para dotar a la aplicación del endpoint `DELETE /socios/:id`, conectándolo con un botón de borrado rápido en la interfaz de administración y confirmaciones dinámicas nativas en el navegador.
- **Refactorización y Estilos Nativos:** Limpieza del historial retirando archivos locales basura (`.vscode/launch.json`), optimización de código repetido en los `fetch` y migración de estilos dinámicos de JavaScript a reglas limpias en la hoja `src/css/estilos.css` para optimizar el rendimiento.

---

## Tareas compartidas (Sincronización)
- **Depuración:** Pruebas conjuntas del flujo completo (Frontend <-> Backend <-> MySQL).
- **Git:** Gestión de ramas y resolución de conflictos en el repositorio compartido ya que se hizo ramas de prueba que despues fueron implementadas a la principal.
- **Revisión final:** Comprobación de que se cumplen todos los requisitos técnicos del RA 6.

---

# ‼️‼️La verdad que la mayoria de tareas fueron compartidas‼️‼️
