import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const ExcluirSessao = () => {
  const [sessoes, setSessoes] = useState([]);
  const [sessaoId, setSessaoId] = useState('');
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchSessoes() {
      try {
        const resposta = await fetch('http://localhost:5016/sessoes');
        if (!resposta.ok) throw new Error('Erro ao buscar sessões');
        const dados = await resposta.json();
        setSessoes(dados);
      } catch (erro) {
        console.error('Erro ao buscar sessões:', erro);
        setErro(erro.message);
      }
    }
    fetchSessoes();
  }, []);

  const handleSessaoChange = (e) => {
    const id = e.target.value;
    setSessaoId(id);
    const sessao = sessoes.find(sessao => sessao.id === parseInt(id));
    setSessaoSelecionada(sessao);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!sessaoId) return;

    try {
      const resposta = await fetch(`http://localhost:5016/sessoes/${sessaoId}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) throw new Error('Erro ao excluir sessão');

      setNotification({ type: 'success', message: 'Sessão excluída com sucesso!' });
      setSessaoId('');
      setSessaoSelecionada(null);
      setSessoes(sessoes.filter(sessao => sessao.id !== parseInt(sessaoId)));
    } catch (erro) {
      console.error('Erro ao excluir sessão:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir sessão. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Sessão</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="sessaoId">ID da Sessão:</label>
          <select id="sessaoId" value={sessaoId} onChange={handleSessaoChange} required>
            <option value="">Selecione uma sessão</option>
            {sessoes.map(sessao => (
              <option key={sessao.id} value={sessao.id}>{sessao.id}</option>
            ))}
          </select>
        </div>
        {sessaoSelecionada && (
          <>
            <h2>Detalhes da Sessão</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID do Filme</th>
                  <th>ID da Sala</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{sessaoSelecionada.id}</td>
                  <td>{sessaoSelecionada.idFilme}</td>
                  <td>{sessaoSelecionada.idSala}</td>
                  <td>{sessaoSelecionada.data}</td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Excluir</button>
          </>
        )}
      </form>
    </div>
  );
};

export default ExcluirSessao;