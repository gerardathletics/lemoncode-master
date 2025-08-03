// 1. Array operations

// Head
// Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring.

const head = ([first]) => first;

const array1 = [11, 22, 33, 44, 55];
console.log('--- Head ---');
console.log('Array original:', array1);
console.log('Primer elemento (head):', head(array1));
console.log('\n');

// Tail
// Implementa una función tail (inmutable), tal que, dado un array como entrada devuélvalo sin su primer elemento. Utiliza rest operator.

const tail = ([, ...rest]) => rest;
const array2 = ['Tarragona', 'Barcelona', 'Girona', 'Lleida'];
console.log('--- Tail ---');
console.log('Array original:', array2);
console.log('Todos menos el primero (tail):', tail(array2));
console.log('\n');

// Init
// Implementa una función init (inmutable), tal que, dado un array como entrada devuelva todos sus elementos excepto el último. Utiliza rest operator.

const init = (arr) => arr.slice(0, -1);
const array3 = [10, 20, 30, 40, 50];
console.log('--- Init ---');
console.log('Array original:', array3);
console.log('Todos menos el último (init):', init(array3));
console.log('\n');

// Last
// Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento.

const last = (arr) => arr.slice(-1)[0];
const array4 = ['Getafe', 'Real Madrid', 'Barcelona', 'Valencia', 'Sevilla'];
console.log('--- Last ---');
console.log('Array original:', array4);
console.log('Último elemento (last):', last(array4));
console.log('\n');
