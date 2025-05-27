import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

function EditarSessao() {
  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [erro, setErro] = useState(null);
  const [idSessao, setIdSessao] = useState('');
  const [idFilme, setIdFilme] = useState('');
  const [idSala, setIdSala] = useState('');
  const [data, setData] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        const respostaFilmes = await fetch('http://localhost:5016/filmes');
        if (!respostaFilmes.ok) throw new Error('Erro ao buscar filmes');
        const dadosFilmes = await respostaFilmes.json();

        const respostaSalas = await fetch('http://localhost:5016/salas');
        if (!respostaSalas.ok) throw new Error('Erro ao buscar salas');
        const dadosSalas = await respostaSalas.json();

        setSessoes(dadosSessoes);
        setFilmes(dadosFilmes);
        setSalas(dadosSalas);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  const handleSessaoChange = (e) => {
    const id = e.target.value;
    setIdSessao(id);
    const sessao = sessoes.find(sessao => sessao.id === parseInt(id));
    if (sessao) {
      setSessaoSelecionada(sessao);
      setIdFilme(sessao.idFilme);
      setIdSala(sessao.idSala);
      setData(sessao.data);
    } else {
      setSessaoSelecionada(null);
      setIdFilme('');
      setIdSala('');
      setData('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:5016/sessoes/${idSessao}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idFilme, idSala, data }),
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar sessão');
      setNotification({ type: 'success', message: 'Sessão atualizada com sucesso!' });
      
      // Resetar o formulário após envio bem-sucedido
      setIdSessao('');
      setSessaoSelecionada(null);
      setIdFilme('');
      setIdSala('');
      setData('');
    } catch (erro) {
      console.error('Erro ao atualizar sessão:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar sessão. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Editar Sessão</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="sessaoId">ID da Sessão:</label>
        <select id="sessaoId" value={idSessao} onChange={handleSessaoChange}>
          <option value="">Selecione uma sessão</option>
          {sessoes.map(sessao => (
            <option key={sessao.id} value={sessao.id}>{sessao.id}</option>
          ))}
        </select>

        {sessaoSelecionada && (
          <>
            <label htmlFor="filmeId">ID do Filme:</label>
            <select id="filmeId" value={idFilme} onChange={(e) => setIdFilme(e.target.value)}>
              <option value="">Selecione um filme</option>
              {filmes.map(filme => (
                <option key={filme.id} value={filme.id}>{filme.titulo}</option>
              ))}
            </select>

            <label htmlFor="salaId">ID da Sala:</label>
            <select id="salaId" value={idSala} onChange={(e) => setIdSala(e.target.value)}>
              <option value="">Selecione uma sala</option>
              {salas.map(sala => (
                <option key={sala.id} value={sala.id}>{sala.id}</option>
              ))}
            </select>

            <label htmlFor="data">Data:</label>
            <input
              type="datetime-local"
              id="data"
              name="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />

            <button type="submit">Salvar</button>
          </>
        )}
      </form>
    </div>
  );
}

export default EditarSessao;
