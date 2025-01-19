import React, { Component } from 'react';


class ErrorBoundary extends Component {
  state = { hasError: false };

  // Esse método é chamado quando um erro é detectado
  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar a interface de fallback
    return { hasError: true };
  }

  // Esse método é chamado para capturar detalhes do erro
  componentDidCatch(error, info) {
    console.error('Erro capturado:', error);
    console.info('Informações do erro:', info);
  }

  render() {
    if (this.state.hasError) {
      // Quando ocorrer um erro, exibe uma mensagem personalizada
      return <h1>Algo deu errado. Estamos trabalhando para corrigir.</h1>;
    }

    // Caso contrário, renderiza os componentes filhos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
