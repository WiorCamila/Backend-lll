# 🚀 ShipNow - Backend Refactoring (Products & Users)

Este proyecto consiste en la refactorización integral de una aplicación Node.js. Se aislaron por completo las responsabilidades de enrutamiento, lógica de negocio y acceso a datos para las entidades de **Products** y **Users**, garantizando además la seguridad mediante variables de entorno protegidas y constantes centralizadas.

--------------------------------------------------------------------------------------------------------------

```

src/
    ├── config/
    ├   └── env.config.js
    ├── constants/
    │   └── index.js
    ├── controllers/
    │   ├── product.controller.js
    │   └── user.controller.js
    ├── models/
    │   ├── product.model.js
    │   └── user.model.js
    ├── repositories/
    │   ├── product.repository.js
    │   └── user.repository.js
    ├── routes/
    │   ├── product.routes.js
    │   └── user.routes.js
    ├── services/
    │   ├── product.service.js
    │   └── user.service.js
    ├── app.js
    └── server.js
├── .env
├── .gitignore
├── package.json
├── README.md

```

--------------------------------------------------------------------------------------------------------------
## 🛠️ Instrucciones para correr el proyecto localmente

Sigue estos pasos para configurar y levantar el servidor en tu entorno local:

### 1. Clonar el repositorio
git clone <LINK_DE_TU_REPOSITORIO_AQUÍ>

### 2. Instalar las dependencias. 
" npm install "

### 3. Configurar las variables de entorno.
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow

### 4. Iniciar el servidor
" npm run dev "