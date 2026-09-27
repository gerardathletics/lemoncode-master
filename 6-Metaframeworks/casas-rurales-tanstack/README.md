# Casas rurales con TanStack Start

Implementación del laboratorio de MetaFrameworks utilizando TanStack Start y React.

## Funcionalidades

- Listado de casas rurales.
- Página de detalle mediante una ruta dinámica.
- Navegación entre listado y detalle.
- Búsqueda por nombre o ubicación.
- Búsqueda guardada en los parámetros de la URL.
- Página personalizada para casas inexistentes.
- Metadatos dinámicos en la página de detalle.
- Optimización de imágenes con Unpic.

## Tecnologías

- TanStack Start
- TanStack Router
- React
- TypeScript
- Tailwind CSS
- Unpic
- Nitro

## API

La aplicación necesita el mock API del laboratorio ejecutándose en:

```text
http://localhost:3001
```

Endpoints utilizados:

```text
GET /api/houses
GET /api/houses/:id
```

## Instalación y ejecución

Instalar las dependencias:

```bash
npm install
```

Arrancar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

## Comprobaciones

```bash
npx tsc --noEmit
npm run lint
npm run build
```
