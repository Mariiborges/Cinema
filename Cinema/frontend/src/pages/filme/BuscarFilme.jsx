import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const BuscarFilme = () => {
  const [filmeId, setFilmeId] = useState('');
  const [filme, setFilme] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const handleChange = (e) => {
    setFilmeId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/filmes/${filmeId}`);
      if (!resposta.ok) throw new Error('Erro ao buscar filme');
      const dados = await resposta.json();
      setFilme(dados);
      setNotification({ type: 'success', message: 'Filme encontrado com sucesso!' });
      setErro(null);
    } catch (erro) {
      console.error('Erro ao buscar filme:', erro);
      setNotification({ type: 'error', message: 'Erro ao buscar filme. Tente novamente.' });
      setFilme(null);
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Buscar Filme</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="filmeId">ID do Filme:</label>
          <select id="filmeId" value={filmeId} onChange={handleChange} required>
            <option value="">Selecione um filme</option>
            {filmes.map(filme => (
              <option key={filme.id} value={filme.id}>{filme.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Buscar</button>
      </form>
      {erro && <p>Erro: {erro}</p>}
      {filme && (
        <div>
          <h2>Detalhes do Filme</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{filme.id}</td>
                <td>{filme.titulo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarFilme;