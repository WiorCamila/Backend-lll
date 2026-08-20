---

## 🧪 Testing Funcional y Automatizado

El proyecto cuenta con una suite completa de pruebas funcionales automatizadas integradas, desarrolladas con **Mocha**, **Chai** y **Supertest**. 

### 🛠️ Herramientas utilizadas
* **Mocha:** Runner para la organización, estructura y ejecución de los casos de prueba.
* **Chai:** Librería de aserciones para la validación de estructuras, valores y tipos (`expect`).
* **Supertest:** Agente de peticiones HTTP para testing de controladores y endpoints de Express sin necesidad de levantar un servidor físico en red.

### ⚙️ Entorno de Pruebas
Las pruebas corren en un entorno aislado configurado en `./src/.env.test`.
* **Modo:** `NODE_ENV=test`
* **Base de datos:** Conexión a base de datos de pruebas dedicada (`shipnow_test`), garantizando aislamiento total.
* **Limpieza automatizada:** Implementación de `beforeEach` para reiniciar colecciones antes de cada prueba y garantizar repetibilidad de los datos.

### 📋 Módulos Cubiertos
1. **Usuarios (`/api/users`):**
   * Listado de usuarios (`GET 200 OK`).
   * Creación exitosa de usuario (`POST 201/200`).
   * Manejo de errores por envío de datos incompletos (`POST 400/500`).
2. **Productos (`/api/products`):**
   * Obtención del catálogo de productos (`GET 200 OK`).
   * Creación de productos (`POST 201/200`).
   * Error por faltantes en datos obligatorios (`POST 400/500`).
3. **Pedidos y Entregas (`/api/orders` & `/api/deliveries`):**
   * Listado de pedidos y entregas (`GET 200 OK`).
   * Creación de pedido (`POST 200/201/400`).
   * Error ante consulta con ID inexistente (`GET 400/404/500`).
4. **Mocks, Logger y Documentación:**
   * Módulo de generación de Mocks (`/api/mocks/mockingusers` y `/api/mocks/generateData`).
   * Test del sistema de logs Winston (`/loggerTest`).
   * Interfaz de documentación interactiva (`/api/docs/`).
   * Manejo global de rutas inexistentes (`404 Not Found`).

### 🚀 Cómo ejecutar los tests

Para correr la suite completa de pruebas funcionales, ejecuta el siguiente comando en la terminal:

```bash

npm test

---

## 📂 Estructura del Proyecto

```

├── src/
│   ├── config/
│   │   ├── env.config.js
│   │   └── swagger.config.js
│   ├── constants/
│   │   ├── error.constants.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── mock.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── docs/
│   │   ├── mocks.yaml
│   │   ├── routes.yaml
│   │   └── schemas.yaml
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
│   │   ├── delivery.routes.js
│   │   ├── mock.routes.js
│   │   ├── order.routes.js
│   │   ├── product.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── mock.service.js
│   │   ├── product.service.js
│   │   └── user.service.js
│   ├── tests/
│   │   ├── setup.js
│   │   └── test.js
│   ├── utils/
│   │   ├── custom.error.js
│   │   ├── logger.js
│   │   └── mock.util.js
│   ├── .env
│   ├── .env.example
│   ├── .env.test
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
