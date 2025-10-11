# Mortydex

¡Bienvenido a Mortydex! Esta es una aplicación web creada con Next.js que te permite explorar el vasto universo de personajes de la popular serie "Rick and Morty".

## Descripción

Mortydex es una aplicación interactiva que consume la [API de Rick and Morty](https://rickandmortyapi.com/) para mostrar información detallada sobre los personajes. Los usuarios pueden ver una lista completa de personajes, buscarlos por nombre, filtrarlos por diferentes atributos y ver los detalles de cada uno en una página dedicada. La aplicación también incluye un sistema de autenticación de usuarios.

## ✨ Características

- **Visualización de Personajes:** Navega por una lista paginada de todos los personajes de Rick and Morty.
- **Búsqueda y Filtrado:** Encuentra personajes específicos utilizando la barra de búsqueda o aplicando filtros por estado, especie y género.
- **Paginación:** Navega fácilmente a través de las páginas de resultados.
- **Detalles del Personaje:** Haz clic en un personaje para ver su información detallada.
- **Autenticación de Usuarios:** Sistema de inicio y cierre de sesión para usuarios.
- **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta ordenadores de escritorio.
- **Carga Optimizada:** Muestra un esqueleto de carga (`skeleton`) mientras se obtienen los datos para mejorar la experiencia del usuario.

## 🚀 Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) 15.5.4 (con Turbopack)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/) 19.1.0
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) 4
- **Gestión de Estado:** [Zustand](https://github.com/pmndrs/zustand)
- **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)
- **Linting:** [ESLint](https://eslint.org/)

## 🏁 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 20 o superior) y un gestor de paquetes como [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/).

### Instalación

1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/mortydex.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd mortydex
    ```
3.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

### Ejecución

Una vez que hayas instalado las dependencias, puedes ejecutar la aplicación en modo de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## 📜 Scripts Disponibles

En el archivo `package.json`, encontrarás los siguientes scripts:

-   `npm run dev`: Inicia la aplicación en modo de desarrollo con Turbopack.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run start`: Inicia un servidor de producción.
-   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.