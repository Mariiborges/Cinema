import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const ExcluirIngresso = () => {
  const [ingressos, setIngressos] = useState([]);
  const [ingressoId, setIngressoId] = useState('');
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchIngressos() {
      try {
        const resposta = await fetch('http://localhost:5016/ingressos');
        if (!resposta.ok) throw new Error('Erro ao buscar ingressos');
        const dados = await resposta.json();
        setIngressos(dados);
      } catch (erro) {
        console.error('Erro ao buscar ingressos:', erro);
        setErro(erro.message);
      }
    }
    fetchIngressos();
  }, []);

  const handleIngressoChange = (e) => {
    const id = e.target.value;
    setIngressoId(id);
    const ingresso = ingressos.find(ingresso => ingresso.id === parseInt(id));
    setIngressoSelecionado(ingresso);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!ingressoId) return;

    try {
      const resposta = await fetch(`http://localhost:5016/ingressos/${ingressoId}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) throw new Error('Erro ao excluir ingresso');

      setNotification({ type: 'success', message: 'Ingresso excluído com sucesso!' });
      setIngressoId('');
      setIngressoSelecionado(null);
      setIngressos(ingressos.filter(ingresso => ingresso.id !== parseInt(ingressoId)));
    } catch (erro) {
      console.error('Erro ao excluir ingresso:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir ingresso. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Ingresso</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="ingressoId">ID do Ingresso:</label>
          <select id="ingressoId" value={ingressoId} onChange={handleIngressoChange} required>
            <option value="">Selecione um ingresso</option>
            {ingressos.map(ingresso => (
              <option key={ingresso.id} value={ingresso.id}>{ingresso.id}</option>
            ))}
          </select>
        </div>
        {ingressoSelecionado && (
          <>
            <h2>Detalhes do Ingresso</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID da Sessão</th>
                  <th>Asseto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ingressoSelecionado.id}</td>
                  <td>{ingressoSelecionado.idSessao}</td>
                  <td>{ingressoSelecionado.assento}</td>
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

export default ExcluirIngresso;