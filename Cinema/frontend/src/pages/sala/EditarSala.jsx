import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const EditarSala = () => {
  const [salas, setSalas] = useState([]);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [erro, setErro] = useState(null);
  const [salaId, setSalaId] = useState('');
  const [qntCadeiras, setQntCadeiras] = useState('');
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

  const handleSalaChange = (e) => {
    const id = e.target.value;
    setSalaId(id);
    const sala = salas.find(sala => sala.id === parseInt(id));
    if (sala) {
      setSalaSelecionada(sala);
      setQntCadeiras(sala.qntCadeiras);
    } else {
      setSalaSelecionada(null);
      setQntCadeiras('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salaData = {
      id: salaId,
      qntCadeiras: parseInt(qntCadeiras),
    };

    try {
      const resposta = await fetch(`http://localhost:5016/salas/${salaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salaData),
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar sala');
      setNotification({ type: 'success', message: 'Sala atualizada com sucesso!' });
      
      // Resetar o formulário após envio bem-sucedido
      setSalaId('');
      setSalaSelecionada(null);
      setQntCadeiras('');
    } catch (erro) {
      console.error('Erro ao atualizar sala:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar sala. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Editar Sala</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
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
            <label htmlFor="qntCadeiras">Quantidade de Cadeiras:</label>
            <input
              type="number"
              id="qntCadeiras"
              name="qntCadeiras"
              value={qntCadeiras}
              onChange={(e) => setQntCadeiras(e.target.value)}
              required
            />
            <button type="submit">Salvar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditarSala;
