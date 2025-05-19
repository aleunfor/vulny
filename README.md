# 🪲 Vulny | DAST escáner gratuito | Hackaton Clerk-Midudev Mayo 2025

**Vulny** es un escáner DAST (Dynamic Application Security Testing) gratuito y fácil de usar. Permite analizar entornos web en busca de vulnerabilidades de seguridad de manera sencilla y visual.

<details>
  <summary>📖 Tabla de contenido</summary>
      
- [🪲 Vulny | DAST escáner gratuito | Hackaton Clerk-Midudev Mayo 2025](#-vulny--dast-escáner-gratuito--hackaton-clerk-midudev-mayo-2025)
  - [📃 Características](#-características)
  - [⚙️ Funcionamiento](#️-funcionamiento)
    - [¿Qué detectará?](#qué-detectará)
  - [💻 Tecnologías utilizadas](#-tecnologías-utilizadas)
  - [❓ ¿Cómo se utilizó clerk?](#-cómo-se-utilizó-clerk)
  - [💿 Instalación](#-instalación)
  - [📦 Comandos](#-comandos)
  - [📷 Capturas de pantalla](#-capturas-de-pantalla)
    - [Lista de vulnerabilidades](#lista-de-vulnerabilidades)
    - [Lista de escaneos](#lista-de-escaneos)
    - [PDF descargable](#pdf-descargable)
</details>

## 📃 Características

- Escaneo de aplicaciones web por URL
- Visualización de vulnerabilidades detectadas
- Estadísticas del último escaneo
- Historial de escaneos por usuario
- Interfaz intuitiva y moderna

## ⚙️ Funcionamiento

Al loguearse, el usuario puede realizar un escaneo dinámico, osea un escaneo en estado de ejecución de entornos web. El backend recibe la petición junto con el token que carga automáticamente los componentes de clerk al estar logueado. Se dispara un script realizado en python que se encargará de ejecutar el escaneo DAST con una herramienta llamada OWASP ZAP, las vulnerabilidades son ligadas a un escaneo y cada escaneo ligada a un usuario guardados en MongoDB (sólo almacenará el id del usuario).

_La herramienta OWASP ZAP solo realizará un escaneo rápido y pasivo de su aplicación, que no entorpecerá sus servicios._

### ¿Qué detectará?

- Encabezados de seguridad faltantes
- Problemas obvios y visibles en el tráfico HTTP/HTTPS
- Cuestiones básicas de configuración

## 💻 Tecnologías utilizadas

- **React** (TypeScript)
- **Clerk** para autenticación y gestión de usuarios
- **TailwindCSS** para estilos
- **PrimeReact** para componentes UI
- **Heroicons** para iconos
- **API en express.js** https://github.com/aleunfor/vulny_backend.git
- **Axios** para peticiones
- **jspdf** para descarga de pdf con lista de vulnerabilidades

## ❓ ¿Cómo se utilizó clerk?

Para poder hacer realizar un escaneo es necesario estar registrado con el servicio de Clerk. Insertando sus componentes previamente creados.

Validación en Backend: el backend recibe el token y lo valida de igual forma a través del middleware que dispone la librería de clerk para Express.

## 💿 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/vulny.git
   cd vulny
   ```

## 📦 Comandos

All commands on root of project:

| Command         | Action                              |
| :-------------- | :---------------------------------- |
| `npm install`   | Instala dependencias                |
| `npm run dev`   | Inicia servidor en `localhost:5173` |
| `npm run build` | Coompilación en `./dist/`           |

## 📷 Capturas de pantalla

### Lista de vulnerabilidades

![Vulnerabilidades](/public/vulns.png)

### Lista de escaneos

![Vulnerabilidades](/public/scans.png)

### PDF descargable

![PDF](/public/pdf.png)
