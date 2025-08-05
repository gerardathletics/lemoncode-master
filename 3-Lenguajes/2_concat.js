// 2. Concat

// Implementa una función concat (inmutable) tal que, dados dos arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.

const concat = (arr1, arr2) => [...arr1, ...arr2];

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
console.log('--- Concat ---');
console.log('Array 1:', array1);
console.log('Array 2:', array2);
console.log('Concatenación:', concat(array1, array2));

// Opcional
// Implementa una nueva versión de concat donde se acepten múltiples arrays de entrada (más de 2). No utilices el método Array.prototype.concat.

const concatMultiple = (...arrays) => {
    const result = [];
    for (const arr of arrays) {
        result.push(...arr);
    }
    return result;
};

// Ejemplo de uso con múltiples arrays
const arrayA = ['a', 'b', 'c'];
const arrayB = ['d', 'e', 'f'];
const arrayC = ['g', 'h', 'i'];
console.log('\n--- Concat Múltiple ---');
console.log('Array A:', arrayA);
console.log('Array B:', arrayB);
console.log('Array C:', arrayC);
console.log('Concatenación múltiple:', concatMultiple(arrayA, arrayB, arrayC));
