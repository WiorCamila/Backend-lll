# ShipNow API - Backend Architecture & Management System

API RESTful desarrollada en Node.js y Express para la gestión de envíos, órdenes, usuarios y autenticación del sistema **ShipNow**. Incluye mocking de datos, logging estructurado, documentación interactiva con Swagger UI, suite de tests automatizados y carga centralizada de documentos/comprobantes con Multer.

---

## 🛠️ Tecnologías Utilizadas

- **Entorno de Ejecución:** Node.js (ES Modules)
- **Framework Web:** Express.js
- **Base de Datos:** MongoDB & Mongoose (ODM)
- **Carga de Archivos:** Multer
- **Mocking:** `@faker-js/faker`
- **Logging & Monitoreo:** Winston
- **Documentación API:** OpenAPI 3.0 & Swagger UI (`swagger-ui-express`, `yamljs`)
- **Testing & Assertions:** Mocha, Chai, Supertest

---

## 📂 Estructura del Proyecto

```

├── logs/                  
├── uploads/                
│   ├── documents/         
│   └── receipts/           
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
│   │   ├── error.middleware.js
│   │   └── uploader.middleware.js 
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
## ⚙️ Requisitos Previos e Instalación

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

### 4. Modo produccion
" npm start "

## 🔌 Endpoints Destacados

### 📁 Carga de Archivos (/api/users & /api/orders)
POST /api/users/:uid/documents: Subida de documentación de usuario (multipart/form-data).
- Campo del archivo: document
- Campo adicional: docType (identification, address_proof, license, account_statement)

POST /api/orders/:oid/receipt: Subida de comprobantes de pago o entrega (multipart/form-data).
- Campo del archivo: receipt

### 🧪 Mocking (/api/mocks)
POST /api/mocks/generateData: Genera e inserta datos simulados en MongoDB utilizando @faker-js/faker.

### 📊 Logging & Monitoreo (/loggerTest)
GET /loggerTest: Verifica la emisión y rotación de registros del sistema en todos los niveles Winston (DEBUG, HTTP, INFO, WARNING, ERROR, FATAL).

### 📚 Documentación Interactiva
GET /api/docs/: UI interactiva de Swagger para explorar y probar todos los endpoints de la API.

### 🧪 Pruebas Automatizadas
Para ejecutar la suite de pruebas funcionales y de integración con Mocha, Chai y Supertest:
" npm test "