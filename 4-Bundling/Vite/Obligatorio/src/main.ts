import classes from './styles.module.css';

const message = import.meta.env.VITE_MESSAGE;

console.log(message);

const app = document.getElementById('app');

const h1 = document.createElement('h1');
h1.textContent = 'HOLA MUNDO CON VITE';
h1.classList.add(classes.title);

const messageP = document.createElement('p');
messageP.textContent = message;
messageP.classList.add(classes.message);
app?.appendChild(h1);
app?.appendChild(messageP);
