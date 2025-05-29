import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const ExcluirSala = () => {
  const [salas, setSalas] = useState([]);
  const [salaId, setSalaId] = useState('');
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const resposta = await fetch('http://localhost:5016/salas');
        if (!resposta.ok) throw new Error('Erro ao buscar salas');
        const dados = await resposta.json();
        setSalas(dados);
      } catch (erro) {
        console.error('Erro ao buscar salas:', erro);
        setErro(erro.message);
      }
    }
    fetchSalas();
  }, []);

  const handleSalaChange = (e) => {
    const id = e.target.value;
    setSalaId(id);
    const sala = salas.find(sala => sala.id === parseInt(id));
    setSalaSelecionada(sala);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!salaId) return;

    try {
      const resposta = await fetch(`http://localhost:5016/salas/${salaId}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) throw new Error('Erro ao excluir sala');

      setNotification({ type: 'success', message: 'Sala excluída com sucesso!' });
      setSalaId('');
      setSalaSelecionada(null);
      setSalas(salas.filter(sala => sala.id !== parseInt(salaId)));
    } catch (erro) {
      console.error('Erro ao excluir sala:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir sala. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Sala</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="salaId">ID da Sala:</label>
          <select id="salaId" value={salaId} onChange={handleSalaChange} required>
            <option value="">Selecione uma sala</option>
            {salas.map(sala => (
              <option key={sala.id} value={sala.id}>{sala.id}</option>
            ))}
          </select>
        </div>
        {salaSelecionada && (
          <>
            <h2>Detalhes da Sala</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quantidade de Cadeiras</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{salaSelecionada.id}</td>
                  <td>{salaSelecionada.qntCadeiras}</td>
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

export default ExcluirSala;
