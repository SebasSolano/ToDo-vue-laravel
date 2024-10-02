# Proyecto ToDo con Laravel y Vue.js

Este repositorio contiene una aplicación de tareas ("ToDo") desarrollada con un backend en **Laravel 10** y un frontend en **Vue.js**. La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus notas/tareas, incluyendo funcionalidades como crear, editar, eliminar y listar notas, así como moverlas entre diferentes estados (activo, completado, expirado).

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (Vue.js)](#frontend-vuejs)
- [Configuración](#configuración)
  - [Configuración del Backend](#configuración-del-backend)
  - [Configuración del Frontend](#configuración-del-frontend)
- [Ejecución](#ejecución)
  - [Ejecutar el Backend](#ejecutar-el-backend)
  - [Ejecutar el Frontend](#ejecutar-el-frontend)
- [Funciones Principales](#funciones-principales)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)


## Tecnologías Utilizadas

- **Backend**: Laravel 10, PHP 8+
- **Frontend**: Vue.js 3, Vue Router, Vuex
- **Base de Datos**: MySQL o SQLite (para desarrollo)
- **Autenticación**: Laravel Sanctum
- **Estilos**: Ant Design Vue
- **Herramientas Adicionales**: Axios, Day.js

## Requisitos Previos

- **PHP** >= 8.0
- **Composer** >= 2.0
- **Node.js** >= 14.x
- **npm** >= 6.x o **Yarn**
- **Servidor Web**: Apache, Nginx o el servidor embebido de PHP
- **Base de Datos**: MySQL, PostgreSQL o SQLite

## Instalación

### Backend (Laravel)

1. **Clonar el repositorio del backend:**

   ```bash
   git clone https://github.com/SebasSolano/ToDo-vue-laravel.git
   cd ToDo-vue-laravel

2. **Instalar las dependencias de PHP:**

   ```bash
   composer install

### Frontend (Vue.js)

1. **Clonar el repositorio del frontend:**

   ```bash
   git clone https://github.com/SebasSolano/ToDo-vue-laravel.git
   cd ToDo-vue-laravel

2. **Instalar las dependencias de Node.js:**

   ```bash
   npm install
## Ejecución
### Ejecutar el Backend
```bash
php artisan serve
```

### Ejecutar el Frontend
```bash
npm run dev
```


## Funciones Principales
### Autenticación de Usuarios:

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Autenticación mediante tokens (Laravel Fortify)

### Gestión de Notas/Tareas:

- Crear una nueva nota
- Listar notas por estado (activo, completado, expirado)
- Editar notas existentes
- Eliminar notas
- Mover notas entre diferentes estados mediante drag-and-drop
- Las notas tienen títulos, descripciones, fechas de vencimiento y etiquetas

### Actualización Automática de Estados:

- Las notas se actualizan automáticamente al estado "expirado" si la fecha de vencimiento ha pasado

