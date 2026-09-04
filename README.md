# 🚀 ShipNow API - Backend Architecture

API RESTful desarrollada para la gestión logística de envíos, usuarios, productos y entregas de ShipNow. Optimizada para entornos de desarrollo y producción, con soporte de monitoreo, rotación de logs, documentación interactiva, tests de integración y containerización mediante Docker.

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** Node.js (v20)
- **Framework:** Express.js
- **Base de Datos:** MongoDB & Mongoose
- **Logging & Monitoreo:** Winston
- **Documentación:** Swagger UI (`swagger-ui-express`)
- **Testing:** Mocha, Chai & Supertest
- **Data Mocking:** `@faker-js/faker`
- **Containerización:** Docker & Docker Desktop

---

## ⚙️ Variables de Entorno

El proyecto utiliza un archivo `.env` ubicado en la raíz. Para configurar el entorno local, se puede tomar como referencia el archivo `.env.example`:

| Variable | Descripción | Ejemplo / Valor por defecto |
| :--- | :--- | :--- |
| `PORT` | Puerto en el que escucha el servidor Express | `3000` |
| `NODE_ENV` | Entorno de ejecución (`development`, `production`, `test`) | `development` |
| `MONGODB_URI` | URI de conexión a MongoDB (Atlas o local) | `mongodb://host.docker.internal:27017/shipnow` |
---

## 📂 Estructura del Proyecto

```

├── logs/                   
├── uploads/                
│   ├── documents/         
│   └── receipts/          
├── src/
│   ├── config/             
│   ├── constants/          
│   ├── controllers/        
│   ├── docs/               
│   ├── middlewares/        
│   ├── models/             
│   ├── repositories/       
│   ├── routes/             
│   ├── services/           
│   ├── tests/              
│   ├── utils/              
│   ├── app.js              
│   └── server.js           
├── .dockerignore           
├── .env                    
├── .env.example            
├── .env.test               
├── .gitignore              
├── Dockerfile              
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
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow

### 4. Iniciar el servidor
" npm run dev "

### 4. Modo produccion
" npm start "


### 🧪 Pruebas Automatizadas
Para ejecutar la suite completa de tests integrales y funcionales (cobertura de usuarios, productos, órdenes, entregas y endpoints generales) utilizando Mocha, Chai y Supertest: " npm test "

### 🔌 Endpoints Destacados, Monitoreo y Docs
- Health Check: GET /health
Endpoint público de estado que retorna el estado de la API (UP), entorno activo (NODE_ENV), uptime y timestamp sin exponer información sensible.

- Documentación Interactiva: GET /api/docs/
Interfaz gráfica de Swagger UI para explorar y probar la totalidad de los endpoints de la API.

- 📁 Carga de Archivos (/api/users & /api/orders):
   - POST /api/users/:uid/documents: Subida de documentación de usuario (multipart/form-data). Campo: document.
   - POST /api/orders/:oid/receipt: Subida de comprobantes (multipart/form-data). Campo: receipt.

- 🧪 Data Mocking (/api/mocks):
   - POST /api/mocks/generateData: Genera e inserta registros masivos de prueba mediante @faker-js/faker.

- 📊 Logging & Monitoreo (/loggerTest):
   - GET /loggerTest: Valida la emisión y rotación de registros en consola y archivos bajo la carpeta /logs.

### 🐳 Despliegue con Docker
1. Construir la imagen de Docker " docker build -t shipnow-api ."
2. Ejecutar el contenedor (Modo Desarrollo)
Conecta la API dentro del contenedor con la base de datos local usando host.docker.internal: " docker run -p 3000:3000 --env-file .env --name shipnow-container shipnow-api "
3. Ejecutar el contenedor en Entorno de Producción " docker run -p 3000:3000 -e NODE_ENV=production -e MONGODB_URI=mongodb://host.docker.internal:27017/shipnow --name shipnow-container shipnow-api "

### 🛡️ Criterios de Seguridad y Performance
- Restricción en Producción: Las rutas de pruebas internas (/loggerTest) y el generador de mocks (/api/mocks) implementan el middleware restrictInProduction, devolviendo automáticamente un error 403 Forbidden si NODE_ENV=production.

- Límites de Carga & Archivos Temporales: Los middlewares de almacenamiento (Multer) restringen el peso máximo y los tipos de archivos.

- Gestión de Exclusiones: Archivos sensibles (.env), archivos cargados (/uploads), registros del sistema (/logs), reportes de cobertura (/coverage) y la carpeta node_modules se encuentran excluidos tanto en .gitignore como en .dockerignore.

- Paginación y Filtros: Respuestas sobre colecciones extensas emplean límites y paginación para evitar un consumo excesivo de memoria y no bloquear el Event Loop.
