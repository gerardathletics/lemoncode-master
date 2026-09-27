# Laboratorio MetaFrameworks

## Enunciado

En este laboratorio vamos a crear una aplicación sencilla de un portal de alquiler vacacional de casas rurales.

La aplicación permitirá a los usuarios listar y ver detalles de casas rurales disponibles para alquilar. Cada casa tendrá información como el nombre, descripción, ubicación, número de habitaciones, baños, precio por noche y una imagen.

## Requisitos

- Implementar la aplicación utilizando al menos dos metaframeworks diferentes vistos en clase: Next.js, TanStack Start o Nuxt.
- Se puede utilizar cualquier solución para los estilos, siempre que sea compatible con server-side rendering.
- Implementar la pantalla de listado de casas rurales.
- Implementar la pantalla de detalle de una casa rural.
- Utilizar un tipo de renderizado apropiado para cada página (SSG, ISR, SSR, etc.) según sus características.
- La aplicación debe ser funcional y permitir la navegación entre las dos pantallas.

## API

Se puede utilizar el [mock `api-server`](https://github.com/Lemoncode/master-frontend-metaframeworks-lab) para obtener los datos de las casas rurales.

Endpoints disponibles:

- Listado de casas rurales: `GET /api/houses`
- Detalle de una casa rural: `GET /api/houses/:id`

## Opcionales

- Implementar una búsqueda en la pantalla de listado, por ejemplo, por nombre o ubicación.
- Añadir un botón para reservar una casa rural.
- Optimizar las imágenes utilizando [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image), [Unpic para TanStack Start](https://unpic.pics/) o [Nuxt Image](https://image.nuxt.com/).

## Entrega

- Subir el código a un repositorio público de GitHub por cada metaframework utilizado.
- Incluir un `README.md` en cada repositorio con los desafíos implementados.
- Compartir los enlaces de los repositorios en el campus para su revisión.
