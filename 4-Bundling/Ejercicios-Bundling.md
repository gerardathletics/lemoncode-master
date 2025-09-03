## Básico

IMPORTANTE: estás prácticas las tenéis que subir a vuestro repositorio de Github (o si lo prefirís Gitlab o Bitbucket público).

También crear un archivo .gitignore, en la parte de webpack añadir la carpeta node_modules y la carpeta dist.

Quedaría una cosa así:
node_modules
dist

Este laboratorio va a tener dos partes, una para webpack y otra para Vite:

### Webpack

#### Obligatorio

Implementar una aplicación simple que:

-   Tenga el bundling montado con webpack.
-   Muestre un logo (por ejemplo el de lemoncode u otro que queráis).
-   Muestre el texto "hola mundo" estilado con SASS.

#### Opcional

Esta parte es opcional, por si queréis seguir practicando. Aquí podéis encontrar los pasos de como hacerlo. Repositorio webpack

-   Mostrar un hola mundo desarrollado con React.
-   Añadir typescript
-   Tener una versión de build de producción.
-   Tener variables de entorno para diferentes entornos (desarrollo y producción).
-   Tener una forma de medir cuanto ocupa cada librería y nuestro código en el bundle.

### Vite

#### Obligatorio

Montar una semilla de proyecto con vite que:

-   Esté configurado con TypeScript y que permita detectar errores de tipos en la terminal si los hubiera.
-   Se pueda ver el tamaño del bundle.
-   Tenga los scripts start para levantar el servidor de desarrollo y preview para levantar el bundle de producción.
-   Tenga variables de entorno. Puedes usar una cadena de texto que muestres con un console.log donde en desarrollo, mientras lo levantas en local con npm start tenga un valor, pero al hacer la build y verlo con npm run preview tenga otro valor.
-   Creéis un elemento H1 con texto utilizando la API del DOM y ese H1 esté estilado con CSSModules.

#### Opcional

Añadir al proyecto semilla de Vite la configuración necesaria para que al hacer la build también genere los ficheros de forma comprimida (GZIP y BROTLI), por lo que al hacer la build deberán existir los ficheros dist/index.js.gz y un dist/index.js.br.
