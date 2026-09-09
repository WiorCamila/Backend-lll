# 🚀 ShipNow API - Backend Final Project (Coderhouse)

RESTful API para la gestión de envíos, órdenes, productos y usuarios, desarrollada con arquitectura en capas, logging centralizado, pruebas automatizadas, documentación interactiva y contenedorización con Docker.

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** Node.js (v20)
* **Framework:** Express.js
* **Base de Datos:** MongoDB & Mongoose
* **Documentación:** Swagger / OpenAPI 3.0
* **Logging:** Winston & `winston-daily-rotate-file`
* **Mocks:** `@faker-js/faker`
* **Testing:** Mocha, Chai, Supertest
* **Contenedorización:** Docker & Docker Compose

---

## 📐 Arquitectura del Proyecto

El proyecto implementa un patrón de diseño en capas de 3 niveles para asegurar el desacoplamiento, escalabilidad y mantenibilidad del código:

```text
Router  ──►  Controller  ──►  Service  ──►  Repository  ──►  DAO / Model

## 📂 Estructura del Proyecto

```
WiorCamila-Backend-lll/
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
├── docker-compose.yml    
├── package-lock.json     
├── package.json          
└── README.md             

```

--------------------------------------------------------------------------------------------------------------
## ⚙️ Requisitos Previos e Instalación

Sigue estos pasos para configurar y levantar el servidor en tu entorno local:

### Clonar el repositorio
git clone https://github.com/WiorCamila/Backend-lll

### ⚙️ Variables de Entorno
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://host.docker.internal:27017/shipnow

### 🚀 Instalación y Ejecución
Opcion 1.
- Instalar dependencias: " npm install "
- Iniciar servidor en modo desarrollo: " npm run dev "

Opcion 2. 
Ejecución con Docker Compose (Recomendado)
- Levantar el entorno de contenedores: " docker compose up --build " o " docker compose down
docker compose up --build "
- Detener los servicios: " docker compose down "

### 🧪 Pruebas Automatizadas
Para ejecutar la suite completa de tests de integración con Mocha: " npm test "

### 📚 Documentación Interactiva (Swagger)
Con el servidor o contenedor en ejecución, accedé a la documentación gráfica interactiva desde el navegador.
- URL: http://localhost:3000/api/docs/

### 🔍 Monitoreo y Logging.
El sistema cuenta con un logger centralizado administrado por Winston:
- Consola: Muestra logs con códigos de color según el entorno activo (debug en desarrollo, info en producción).

Archivos rotativos (/logs):
- error-YYYY-MM-DD.log: Registro diario de errores nivel error y fatal.
- combined-YYYY-MM-DD.log: Registro general de actividad HTTP e informativa.

Endpoint de prueba: GET http://localhost:3000/loggerTest (disponible únicamente en entorno de desarrollo).
