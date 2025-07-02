# 🎬 Pelixy Backoffice

![8V9H](https://github.com/user-attachments/assets/9a44695f-c528-426f-939d-1e5dee320881)

> Plataforma web administrativa para gestionar contenido, usuarios y monitorear la actividad de la aplicación móvil Pelixy.

> ## 🟪 1. Introducción
![Info Emprender Sticker by Kiki Agencia Creativa](https://github.com/user-attachments/assets/5da5ac25-0d62-4fbb-97bb-ecc1a0220179)

Pelixy es una aplicación móvil pensada para personas que disfrutan ver películas y desean recibir recomendaciones personalizadas, dejar comentarios y compartir valoraciones.
El objetivo del proyecto backoffice es ofrecer un panel de administración web para que los encargados de la aplicación puedan gestionar eficazmente la base de datos, los contenidos y a los usuarios registrados.

Este backoffice permite a los administradores realizar tareas esenciales como:

- Gestión de usuarios
- Control del catálogo de películas
- Revisión de comentarios
- Visualización de reportes sobre el comportamiento del sistema

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🟪 🧑‍🤝‍🧑 2. Integrantes del proyecto

![Tech Coding GIF by Pudgy Penguins](https://github.com/user-attachments/assets/4af3fb1c-dc1f-417a-85ed-93cc3118fd3c)

🟦 César Alexander Mayanga Minaya  
🟩 Deysi Aracely Quintana Juarez  
🟨 Jaime Ccapacca Merino  
🟥 Jean Carlos Fasabi Orosco  
🟪 Osmar Mauricio Marca Peña

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🟦 3. Objetivos del proyecto

🎯 Objetivo general:
> Desarrollar una plataforma administrativa web para facilitar el manejo de los datos y recursos que alimentan la app móvil Pelixy.

🎯 Objetivos específicos: 
- Permitir el acceso mediante autenticación básica
- Gestionar las entidades principales: películas, usuarios, comentarios
- Visualizar reportes e indicadores de uso
- Crear una interfaz clara y amigable para el equipo administrador

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🟩 4. Público objetivo

Esta plataforma está orientada a:

- 👥 Usuarios activos de la app Pelixy:
  - Su información y actividad es administrada por este sistema
  - Sus comentarios, valoraciones y cuentas están protegidas y controladas
- 👨‍💼 Administradores del sistema:
  - Visualizan el comportamiento general
  - Gestionan cuentas, películas y contenido
- 🧑‍🏫 Docentes y evaluadores:
  - Revisan la estructura del sistema como parte de una evaluación académica
- 👥 Equipo técnico (QA, desarrolladores):
  - Usan este backoffice para pruebas, mantenimiento y escalabilidad

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🟧 5. Funcionalidades principales

El backoffice de Pelixy ofrece las siguientes funciones clave:

✅ Autenticación segura para el acceso al panel  
✅ Dashboard inicial con resumen del sistema  
✅ Gestión de usuarios:
- Ver usuarios registrados
- Editar información
- Eliminar usuarios
- Ver avatar y estado

✅ Gestión de películas:
- Agregar nuevas películas (con título, descripción, imagen, género, etc.)
- Editar información
- Eliminar del catálogo

✅ Gestión de comentarios:
- Visualizar todos los comentarios de los usuarios
- Editar o eliminar comentarios inapropiados

✅ Reportes visuales:
- Estadísticas generales
- Conteo de películas, usuarios y comentarios
- Actividad reciente

✅ Menú lateral persistente y navegación clara  
✅ Diseño responsivo (funciona en PC, tablets y móviles)

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🟨 6. Arquitectura general
Este sistema sigue una arquitectura cliente-servidor desacoplada:

- Frontend: React + Vite + Material UI
- Backend: Node.js + Express
- Base de datos: PostgreSQL
  
🔗 El backoffice se conecta al backend del sistema móvil a través de peticiones HTTP (REST API).  
🔧 La arquitectura es desacoplada: frontend (React) + backend (Node.js + PostgreSQL).

🟫 7. Tecnologías utilizadas
🧠 Frontend:

React + Vite ⚛️

Material UI 🎨

React Router DOM 🧭

Axios 🔗

🛠 Backend:

Node.js + Express

PostgreSQL

CORS + RESTful API

🧪 Otros:

Postman (pruebas)

GitHub (repositorio)

-------------------------------------------------------------------------------------------------------------------------------------------------------------

🟥 7. Estructura del repositorio

-------------------------------------------------------------------------------------------------------------------------------------------------------------

🟦 8. Licencia
Este proyecto es de uso académico.
Prohibida su reproducción para fines comerciales sin autorización.

![Ni Hablar No Way Sticker by Ositos Con Alcohol](https://github.com/user-attachments/assets/1de98e56-5916-4d70-8370-ab368855dccd)

-------------------------------------------------------------------------------------------------------------------------------------------------------------

✅ 9. ¿Qué hace el proyecto?
Permite a administradores ingresar de forma segura

Visualiza toda la actividad registrada por usuarios de la app

Ofrece herramientas para modificar, eliminar y organizar contenido

Facilita el mantenimiento general de la base de datos Pelixy

Mejora la eficiencia del equipo técnico al proporcionar una vista centralizada del sistema


-------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 10. ¿Cómo ejecutarlo?

1. Clona el repositorio:
git clone https://github.com/Alexander-Mayanga/pelixy-backoffice.git

2. Instala las dependencias:
   npm install
   
3. Ejecuta el entorno local:
   npm run dev

4. Abre tu navegador en:
   http://localhost:5173
   
☑ Asegúrate que el backend esté corriendo en http://localhost:3000 o IP local.

👥 ¿Quién hizo qué?

|           Integrantes             |        Aporte principal                              
| --------------------------------- | -------------------------------------------------------- |
|  César Alexander Mayanga Minaya   |   Reportes, resumen visual y documentación del proyecto  |
|  Deysi Aracely Quintana Juarez    |   CRUD completo: usuarios, películas, comentarios        |
|  Jean Carlos Fasabi Orosco        |   Construcción del layout y navegación principal         |
|  Jaime Ccapacca Merino            |   Integración con API REST existente                     |
|  Osmar Mauricio Marca Peña        |   Desarrollo de la lógica de autenticación               |

![Cat Girl GIF by Pluralsight](https://github.com/user-attachments/assets/b91162f2-020a-45a7-914e-dda490d6e7ae)















