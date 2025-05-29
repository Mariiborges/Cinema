import React, { useState, useEffect } from "react";
import Notification from '../../components/Notification';

const CriarSessao = () => {
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    movieId: "",
    roomId: "",
    date: "",
  });
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const respostaFilmes = await fetch('http://localhost:5016/filmes');
        if (!respostaFilmes.ok) throw new Error('Erro ao buscar filmes');
        const dadosFilmes = await respostaFilmes.json();
        setFilmes(dadosFilmes);

        const respostaSalas = await fetch('http://localhost:5016/salas');
        if (!respostaSalas.ok) throw new Error('Erro ao buscar salas');
        const dadosSalas = await respostaSalas.json();
        setSalas(dadosSalas);
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

    const sessionData = {
      id: 0, // assumindo que o ID é gerado automaticamente no backend
      idFilme: parseInt(formData.movieId),
      idSala: parseInt(formData.roomId),
      data: formData.date,
    };

    try {
      const response = await fetch('http://localhost:5016/sessoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) throw new Error('Erro ao adicionar a sessão');

      setNotification({ type: 'success', message: 'Sessão adicionada com sucesso!' });
      // Resetar o formulário após envio bem-sucedido
      setFormData({
        movieId: "",
        roomId: "",
        date: "",
      });
    } catch (error) {
      setNotification({ type: 'error', message: 'Erro ao adicionar a sessão. Tente novamente.' });
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
        <h2>Adicionar Sessão</h2>
        <div>
          <label htmlFor="movieId">Filme:</label>
          <select
            id="movieId"
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um filme</option>
            {filmes.map(filme => (
              <option key={filme.id} value={filme.id}>{filme.titulo}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="roomId">ID da Sala:</label>
          <select
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma sala</option>
            {salas.map(sala => (
              <option key={sala.id} value={sala.id}>{sala.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CriarSessao;
