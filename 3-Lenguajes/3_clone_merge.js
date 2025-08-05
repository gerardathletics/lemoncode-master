// 3. Clone y Merge

// Implementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con los valores de las propiedades de source.

const clone = (source) => ({ ...source });

const datosClonacion = { nombre: 'Gerard', edad: 29, ciudad: 'Lleida' };
console.log('--- Clone ---');
console.log('Objeto original:', datosClonacion);
console.log('Objeto clonado:', clone(datosClonacion));

// Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target.

const merge = (source, target) => ({ ...target, ...source });

const a = { name: 'Maria', surname: 'Ibañez', country: 'SPA' };
const b = { name: 'Luisa', age: 31, married: true };

console.log('--- Merge ---');
console.log('Objeto a:', a);
console.log('Objeto b:', b);
console.log('Objeto merge:', merge(a, b));
