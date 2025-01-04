import React from 'react';
import ReactDOM from 'react-dom/client'; // Alterado para 'react-dom/client'
import './styles/estilo.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Criação do root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
