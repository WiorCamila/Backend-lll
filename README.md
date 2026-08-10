## 🪵 Sistema de Logging y Monitoreo

El proyecto utiliza **Winston** en conjunto con el módulo **Winston Daily Rotate File** para la gestión centralizada, el formato y la persistencia de los registros del sistema.

### 📊 Niveles de Log Configurados
Se implementó un sistema personalizado de niveles de log ordenados por jerarquía y prioridad:
0. **`fatal`**: Fallas críticas que impiden el funcionamiento del sistema o la conexión a la base de datos.
1. **`error`**: Errores no controlados o fallas internas del servidor (HTTP 5xx).
2. **`warning`**: Advertencias de negocio o errores en parámetros/peticiones (HTTP 4xx).
3. **`info`**: Eventos informativos sobre el estado de la aplicación (inicio del servidor, conexión exitosa a MongoDB, acciones de entidades).
4. **`http`**: Peticiones HTTP entrantes a la API.
5. **`debug`**: Información detallada para tareas de depuración en desarrollo.

### 🌐 Comportamiento según el Entorno
El nivel de detalle en consola se ajusta dinámicamente mediante la variable de entorno `NODE_ENV`:
- **Desarrollo (`NODE_ENV=development`)**: Muestra logs desde el nivel `debug` hasta `fatal` formateados con colores en consola, e igual persiste los errores en archivos.
- **Producción (`NODE_ENV=production`)**: Muestra logs desde el nivel `info` hasta `fatal` en consola sin formatos pesados de color, e igual persiste los errores en archivos.

### 📁 Almacenamiento y Rotación de Logs
- Los registros de nivel **`error`** y **`fatal`** se persisten automáticamente dentro del directorio `/logs` en la raíz del proyecto.
- Los archivos se generan bajo el formato `errors-YYYY-MM-DD.log` utilizando rotación diaria.
- Se conserva un historial máximo de **14 días** (`maxFiles: '14d'`) antes de purgar archivos antiguos automáticamente.

### 🙈 Archivos Ignorados en Git
Para evitar subir datos sensibles o archivos generados en tiempo de ejecución al repositorio, el archivo `.gitignore` incluye:
- `/logs` (directorio de logs)
- `*.log` (cualquier archivo de extensión de logs)

### 🧪 Endpoint de Prueba
Se dispone de un endpoint dedicado para verificar la emisión de logs en todos sus niveles y la correcta escritura en archivo:

```http
GET /loggerTest
---

## 📂 Estructura del Proyecto

```

├── logs/
│   └── errors-2026-08-10.log
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── constants/
│   │   ├── error.constants.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── mock.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── delivery.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── repositories/
│   │   ├── delivery.repository.js
│   │   ├── order.repository.js
│   │   ├── product.repository.js
│   │   └── user.repository.js
│   ├── routes/
│   │   ├── mock.routes.js
│   │   ├── product.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── mock.service.js
│   │   ├── product.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   ├── custom.error.js
│   │   ├── logger.js
│   │   └── mock.util.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

```

--------------------------------------------------------------------------------------------------------------
## 🛠️ Instrucciones para correr el proyecto localmente

Sigue estos pasos para configurar y levantar el servidor en tu entorno local:

### 1. Clonar el repositorio
git clone https://github.com/WiorCamila/Backend-lll

### 2. Instalar las dependencias. 
" npm install "

### 3. Configurar las variables de entorno.
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow

### 4. Iniciar el servidor
" npm run dev "

## 📋 Estructura de Respuesta de Error

Todas las respuestas de error en la API devuelven una estructura JSON unificada y consistente, acompañada por el código de estado HTTP adecuado (por ejemplo, `400 Bad Request` o `500 Internal Server Error`):

```json
{
  "status": "error",
  "error": {
    "name": "InvalidMockParamsError",
    "code": "INVALID_TYPES_ERROR",
    "message": "Las cantidades para generar mocks no pueden ser valores negativos.",
    "cause": "Se recibió usersCount: -3, ordersCount: 5"
  }
}
```

## Pruebas de Comportamiento ante Casos Inválidos

Para probar cómo reacciona el sistema ante solicitudes incorrectas y verificar el manejo centralizado de errores desde herramientas como Postman, se pueden ejecutar las siguientes pruebas:

- Parámetros negativos en módulo de Mocks: 
* **Endpoint:** `GET /api/mocks/mockingdata?users=-3&orders=5 (o POST /api/mocks/generateData con body {"usersCount": -3})`
- Comportamiento esperable: Retorna status 400 Bad Request con un JSON que detalla que no se admiten números negativos.

## Tipos de datos inválidos (no numéricos)
- * **Endpoint:** `POST /api/mocks/generateData`
- Body (JSON):
{
  "usersCount": "abc",
  "ordersCount": 10
}
- Comportamiento esperable: Retorna status 400 Bad Request informando que los parámetros de cantidad deben ser numéricos.

## Falla en el servidor o base de datos (Ejemplo general).
- Comportamiento esperable: Si ocurre una excepción no controlada o falla en la persistencia con MongoDB, el middleware intercepta el error devolviendo status 500 Internal Server Error bajo el mismo formato JSON estandarizado.

* **Ruta:** `POST /api/mocks/generateData`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**

## Módulo de Mocking y Carga de Datos (/api/mocks)
Se incorporó un módulo de mocking independiente que respeta la arquitectura en capas y utiliza @faker-js/faker para simular entidades respetando las constantes de roles, estados y prioridades.

1) Obtener datos simulados en memoria (Sin guardar en DB): Permite generar registros al vuelo. Los datos no se persisten en MongoDB.
* **Ruta:** `GET /api/mocks/mockingdata`

- Query Params: 
 * users: Cantidad de usuarios a generar (por defecto 5).
 * orders: Cantidad de pedidos a generar (por defecto 10).

Ejemplo: GET http://localhost:3000/api/mocks/mockingdata?users=10&orders=15

## Generar e insertar datos de prueba en MongoDB
Genera registros de prueba e inserta realmente en la base de datos MongoDB respetando las relaciones entre entidades y utilizando los repositorios del sistema.

* **Ruta:** `POST /api/mocks/generateData`
* **Headers:** `Content-Type: application/json`
* **Body (JSON)::** {
  "usersCount": 5,
  "ordersCount": 10
}

- Respuesta esperada (201 Created):
{
  "status": "success",
  "payload": {
    "message": "Carga de datos simulados insertada con éxito en la base de datos",
    "summary": {
      "usersGenerated": 7,
      "ordersGenerated": 10,
      "deliveriesGenerated": 10
    }
  }
}

## Reglas y Relaciones del Sistema
- Usuarios y Repartidores: Centralizados mediante constantes para evitar magic strings (USER, DELIVERY, ADMIN).
- Pedidos: Asignados a usuarios clientes existentes con estados y prioridades válidos.
- Entregas: Vinculadas a pedidos y asignadas exclusivamente a usuarios con rol DELIVERY. 