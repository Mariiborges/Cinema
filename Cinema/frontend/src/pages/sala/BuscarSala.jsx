import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const BuscarSala = () => {
  const [salaId, setSalaId] = useState('');
  const [sala, setSala] = useState(null);
  const [salas, setSalas] = useState([]);
  const [erro, setErro] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const handleChange = (e) => {
    setSalaId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/salas/${salaId}`);
      if (!resposta.ok) throw new Error('Erro ao buscar sala');
      const dados = await resposta.json();
      setSala(dados);
      setNotification({ type: 'success', message: 'Sala encontrada com sucesso!' });
      setErro(null);
    } catch (erro) {
      console.error('Erro ao buscar sala:', erro);
      setNotification({ type: 'error', message: 'Erro ao buscar sala. Tente novamente.' });
      setSala(null);
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Buscar Sala</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="salaId">ID da Sala:</label>
          <select id="salaId" value={salaId} onChange={handleChange} required>
            <option value="">Selecione uma sala</option>
            {salas.map(sala => (
              <option key={sala.id} value={sala.id}>{sala.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Buscar</button>
      </form>
      {erro && <p>Erro: {erro}</p>}
      {sala && (
        <div>
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
                <td>{sala.id}</td>
                <td>{sala.qntCadeiras}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarSala;
