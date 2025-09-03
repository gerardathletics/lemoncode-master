import './styles.scss';

import logoGerard from './logo-removebg.png';

const logo = document.createElement('img');
logo.src = logoGerard;
logo.style.width = '150px';

const h1 = document.querySelector('h1');
h1.textContent = 'HOLA MUNDO';

document.body.insertBefore(logo, h1);
