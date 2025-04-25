# FrontendArtistas

Este proyecto es el frontend de una aplicación para gestionar artistas. Fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.1.7.

## Requisitos previos

- Node.js (versión recomendada: 18 o superior)
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)
- Un servidor backend funcional (ver sección "Backend")

## Backend

Para que este frontend funcione correctamente, necesitas montar el backend correspondiente. Sigue estos pasos:

1. Clona el repositorio del backend:
   ```bash
   git clone https://github.com/robertocaamanor/api-nestjs-disqueria.git
   ```

2. Accede al directorio del backend:
   ```bash
   cd api-nestjs-disqueria
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno según las instrucciones del repositorio del backend.

5. Inicia el servidor:
   ```bash
   npm run start
   ```

El backend estará disponible en `http://localhost:3000` por defecto.

## Development server

Para iniciar un servidor de desarrollo local para el frontend, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

## Code scaffolding

Angular CLI incluye herramientas de scaffolding para generar nuevos componentes, directivas, pipes, etc. Por ejemplo, para generar un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para ver una lista completa de esquemas disponibles, ejecuta:

```bash
ng generate --help
```

## Building

Para compilar el proyecto, ejecuta:

```bash
ng build
```

Esto generará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza la aplicación para rendimiento y velocidad.

## Running unit tests

Para ejecutar pruebas unitarias con el framework [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Running end-to-end tests

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Nota: Angular CLI no incluye un framework de pruebas e2e por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Recursos adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).