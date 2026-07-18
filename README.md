# 🚀 ShipNow - Backend Refactoring (Products & Users)

Este proyecto consiste en la refactorización integral de una aplicación Node.js. Se aislaron por completo las responsabilidades de enrutamiento, lógica de negocio y acceso a datos para las entidades de **Products** y **Users**, garantizando además la seguridad mediante variables de entorno protegidas y constantes centralizadas.

--------------------------------------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------------------------------------
