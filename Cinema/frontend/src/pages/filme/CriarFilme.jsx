import React, { useState } from 'react';
import Notification from '../../components/Notification';

const CriarFilme = () => {
  const [titulo, setTitulo] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoFilme = {
      titulo,
    };

    try {
      const resposta = await fetch('http://localhost:5016/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoFilme)
      });

      if (!resposta.ok) throw new Error('Erro ao adicionar filme');
      setNotification({ type: 'success', message: 'Filme adicionado com sucesso!' });
      setTitulo('');
      setErro(null);
    } catch (erro) {
      console.error('Erro ao adicionar filme:', erro);
      setNotification({ type: 'error', message: 'Erro ao adicionar filme. Tente novamente.' });
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Criar Filme</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      {erro && <p>Erro: {erro}</p>}
    </div>
  );
};

export default CriarFilme;