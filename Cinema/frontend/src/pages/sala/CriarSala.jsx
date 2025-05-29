import React, { useState } from "react";
import Notification from '../../components/Notification';

const CriarSala = () => {
  const [notification, setNotification] = useState(null);
  const [qntCadeiras, setQntCadeiras] = useState("");

  const handleChange = (e) => {
    setQntCadeiras(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salaData = {
      id: 0, // assumindo que o ID é gerado automaticamente no backend
      qntCadeiras: parseInt(qntCadeiras),
    };

    try {
      const response = await fetch('http://localhost:5016/salas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salaData),
      });

      if (!response.ok) throw new Error('Erro ao adicionar a sala');

      setNotification({ type: 'success', message: 'Sala adicionada com sucesso!' });
      // Resetar o formulário após envio bem-sucedido
      setQntCadeiras("");
    } catch (error) {
      console.error('Erro ao adicionar a sala:', error);
      setNotification({ type: 'error', message: 'Erro ao adicionar a sala. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Adicionar Sala</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="qntCadeiras">Quantidade de Cadeiras:</label>
          <input
            type="number"
            id="qntCadeiras"
            name="qntCadeiras"
            value={qntCadeiras}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CriarSala;
