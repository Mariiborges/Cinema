import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const ExcluirFilme = () => {
  const [filmes, setFilmes] = useState([]);
  const [filmeId, setFilmeId] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const resposta = await fetch('http://localhost:5016/filmes');
        if (!resposta.ok) throw new Error('Erro ao buscar filmes');
        const dados = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        console.error('Erro ao buscar filmes:', erro);
        setErro(erro.message);
      }
    }
    fetchFilmes();
  }, []);

  const handleFilmeChange = (e) => {
    setFilmeId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/filmes/${filmeId}`, {
        method: 'DELETE',
      });
      if (!resposta.ok) throw new Error('Erro ao excluir filme');
      setNotification({ type: 'success', message: 'Filme excluído com sucesso!' });
      setErro(null);

      // Remover o filme excluído da lista de filmes
      setFilmes(filmes.filter(filme => filme.id !== parseInt(filmeId)));
      setFilmeId('');
    } catch (erro) {
      console.error('Erro ao excluir filme:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir filme. Tente novamente.' });
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Filme</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="filmeId">ID do Filme:</label>
          <select id="filmeId" value={filmeId} onChange={handleFilmeChange} required>
            <option value="">Selecione um filme</option>
            {filmes.map(filme => (
              <option key={filme.id} value={filme.id}>{filme.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
};

export default ExcluirFilme;