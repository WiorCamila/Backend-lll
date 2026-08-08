# 🚀 ShipNow API - Pre-entrega 3

## ⚠️ Manejo Centralizado de Errores y Arquitectura por Capas

El proyecto implementa un manejo centralizado de errores utilizando errores personalizados (`CustomError`), un diccionario estandarizado de errores (`EErrors`) y un middleware global de captura (`errorHandler`).

### 🏗️ Arquitectura por Capas

- **Capa de Servicios (`Service`)**: Concentra la lógica de negocio y las validaciones. Cuando una regla de negocio se viola, se invoca `CustomError.createError(...)`.
- **Capa de Controladores (`Controller`)**: Recibe las peticiones HTTP, delega la ejecución al servicio dentro de un bloque `try/catch` y transfiere cualquier falla al pipeline global usando `next(error)`.
- **Middleware Global (`errorHandler`)**: Intercepta los errores enviados vía `next(error)` y genera la respuesta HTTP correspondiente con formato estandarizado.

---

## 📂 Estructura del Proyecto

```

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
│   │   └── mock.util.js
│   ├── .env
│   ├── .env.example
│   ├── app.js
│   └── server.js
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