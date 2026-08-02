# 📦 ShipNow API - Backend Refactoring & Mocking System

Este proyecto consiste en una API backend en Node.js desarrollada bajo una **arquitectura por capas** (Routes, Controllers, Services, Repositories/DAOs, Models). En esta etapa se aislaron las responsabilidades de las entidades del sistema, se integraron constantes centralizadas, variables de entorno y un **módulo completo de Mocking y Carga de Datos de prueba**.

---

## 📂 Estructura del Proyecto

```
src/
├── config/
│   └── env.config.js
├── constants/
│   └── index.js
├── controllers/
│   ├── mock.controller.js     
│   ├── product.controller.js
│   └── user.controller.js
├── models/
│   ├── delivery.model.js
│   ├── order.model.js
│   ├── product.model.js
│   └── user.model.js
├── repositories/
│   ├── delivery.repository.js
│   ├── order.repository.js
│   ├── product.repository.js
│   └── user.repository.js
├── routes/
│   ├── mock.routes.js          
│   ├── product.routes.js
│   └── user.routes.js
├── services/
│   ├── mock.service.js          
│   ├── product.service.js
│   └── user.service.js
├── utils/
│   └── mock.util.js             
├── app.js
└── server.js

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

## Módulo de Mocking y Carga de Datos (/api/mocks)
Se incorporó un módulo de mocking independiente que respeta la arquitectura en capas y utiliza @faker-js/faker para simular entidades respetando las constantes de roles, estados y prioridades.

## 1. Obtener datos simulados en memoria (Sin guardar en DB)

Permite generar registros al vuelo. Los datos no se persisten en MongoDB.
- Ruta: GET /api/mocks/mockingdata

## Query Params: 
- users: Cantidad de usuarios a generar (por defecto 5).
- orders: Cantidad de pedidos a generar (por defecto 10).

Ejemplo: GET http://localhost:3000/api/mocks/mockingdata?users=10&orders=15

## 2. Generar e insertar datos de prueba en MongoDB

Genera registros de prueba e inserta realmente en la base de datos MongoDB respetando las relaciones entre entidades y utilizando los repositorios del sistema.

- **Ruta:** `POST /api/mocks/generateData`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "usersCount": 5,
  "ordersCount": 10
}

## Reglas y Relaciones del Sistema.
- Usuarios y Repartidores: Centralizados mediante constantes para evitar magic strings (USER, DELIVERY, ADMIN).
- Pedidos: Asignados a usuarios clientes existentes con estados y prioridades válidos.
- Entregas: Vinculadas a pedidos y asignadas exclusivamente a usuarios con rol DELIVERY.
