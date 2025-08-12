// 4. Read books

// Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.

const books = [
    { title: 'Clean Code', isRead: true },
    { title: 'The Pragmatic Programmer', isRead: false },
    { title: 'Designing Data-Intensive Applications', isRead: false },
    { title: 'How to lie with maps', isRead: true },
    { title: 'How charts lie', isRead: true },
];

function isBookRead(books, title) {
    return books.some((book) => book.title === title && book.isRead);
}

console.log(isBookRead(books, 'Clean Code'));
console.log(isBookRead(books, 'The Pragmatic Programmer'));
console.log(isBookRead(books, 'Designing Data-Intensive Applications'));
console.log(isBookRead(books, 'How to lie with maps'));
console.log(isBookRead(books, 'How charts lie'));
