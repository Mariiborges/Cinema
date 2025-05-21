import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const EditarFilme = () => {
  const [filmes, setFilmes] = useState([]);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [filmeId, setFilmeId] = useState('');
  const [titulo, setTitulo] = useState('');
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

  const handleFilmeChange = (e) => {
    const id = e.target.value;
    setFilmeId(id);
    const filme = filmes.find(filme => filme.id === parseInt(id));
    if (filme) {
      setFilmeSelecionado(filme);
      setTitulo(filme.titulo);
    } else {
      setFilmeSelecionado(null);
      setTitulo('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filmeData = {
      id: filmeId,
      titulo: titulo,
    };

    try {
      const resposta = await fetch(`http://localhost:5016/filmes/${filmeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmeData),
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar filme');
      setNotification({ type: 'success', message: 'Filme atualizado com sucesso!' });

      // Resetar o formulário após envio bem-sucedido
      setFilmeId('');
      setFilmeSelecionado(null);
      setTitulo('');
    } catch (erro) {
      console.error('Erro ao atualizar filme:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar filme. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Editar Filme</h1>
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
        {filmeSelecionado && (
          <>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <button type="submit">Salvar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditarFilme;