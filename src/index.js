import React from 'react';
import ReactDOM from 'react-dom/client'; // Alterado para 'react-dom/client'
import App from './App'; // Importa o componente App

const root = ReactDOM.createRoot(document.getElementById('root')); // Cria a raiz do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);