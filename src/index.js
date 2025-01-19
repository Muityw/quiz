import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar o 'react-dom/client'
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import questions from "./questions";

// Crie o root com 'createRoot' e renderize o componente
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

