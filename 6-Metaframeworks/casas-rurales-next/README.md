# Casas rurales con Next.js

Implementación del laboratorio de MetaFrameworks utilizando Next.js, React y App Router.

## Funcionalidades

- Listado de casas rurales.
- Página de detalle mediante una ruta dinámica.
- Navegación entre listado y detalle.
- Búsqueda por nombre o ubicación.
- Página personalizada para casas inexistentes.
- Botón de reserva con confirmación visual.
- Optimización de imágenes con `next/image`.
- Diseño responsive con Tailwind CSS.

## Renderizado

Cada pantalla utiliza una estrategia diferente según sus necesidades.

### Listado: ISR

La página principal utiliza Incremental Static Regeneration

Next.js puede reutilizar la página generada y actualizarla cada hora. El catálogo no necesita cambiar en cada petición.

### Detalle: SSR

La página de detalle desactiva la caché de la petición:

La casa se obtiene y renderiza en el servidor en cada petición. Esto permite mostrar datos actualizados.

### Interactividad

La búsqueda y el botón de reserva son Client Components. El resto de las páginas permanece como Server Components para evitar enviar JavaScript innecesario al navegador.

## Tecnologías

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- App Router
- Next Image

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

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

Para ejecutarla al mismo tiempo que la versión TanStack:

```bash
npm run dev -- --port 3002
```

## Comprobaciones

```bash
npx tsc --noEmit
npm run lint
npm run build
```
