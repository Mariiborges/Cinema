import React, { useState, useEffect } from "react";
import Notification from '../../components/Notification';

const CriarIngresso = () => {
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    idSessao: "",
    assento: "",
  });
  const [sessao, setSessao] = useState([]);
  const [assento, setAssento] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const respostaSessao = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessao.ok) throw new Error('Erro ao buscar sessão');
        const dadosIngresso = await respostaSessao.json();
        setSessao(dadosIngresso);

      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const ingressoData = {
      id: 0, // assumindo que o ID é gerado automaticamente no backend
      idSessao: parseInt(formData.idSessao),
      assento: formData.assento,
    };

    try {
      const response = await fetch('http://localhost:5016/ingressos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingressoData),
      });

      if (!response.ok) throw new Error('Erro ao adicionar a ingresso');

      setNotification({ type: 'success', message: 'Ingresso adicionado com sucesso!' });
      // Resetar o formulário após envio bem-sucedido
      setFormData({
        idSessao: "",
        assento: "",
      });
    } catch (error) {
      setNotification({ type: 'error', message: 'Erro ao adicionar a ingresso. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Ingresso</h2>
        <div>
          <label htmlFor="movieId">ID da Sessão:</label>
          <select
            id="idSessao"
            name="idSessao"
            value={formData.idSessao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma Sessão</option>
            {sessao.map(sessao => (
              <option key={sessao.id} value={sessao.id}>{sessao.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assento">Assento:</label>
          <input
            type="text"
            id="assento"
            name="assento"
            value={formData.assento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CriarIngresso;
