import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

function EditarIngresso() {
  const [ingressos, setIngressos] = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [assento, setAssento] = useState('');
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [idSessao, setIdSessao] = useState('');
  const [idIngresso, setIdIngresso] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        const respostaIngressos = await fetch('http://localhost:5016/ingressos');
        if (!respostaIngressos.ok) throw new Error('Erro ao buscar ingresso');
        const dadosIngresso = await respostaIngressos.json();

        setSessoes(dadosSessoes);
        setIngressos(dadosIngresso);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  const handleSessaoChange = (e) => {
    const id = e.target.value;
    setIdIngresso(id);
    const ingresso = ingressos.find(ingresso => ingresso.id === parseInt(id));
    if (ingresso) {
      setIngressoSelecionado(ingresso);
      setIdSessao(ingresso.idSessao);
      setAssento(ingresso.assento);
    } else {
      setIngressoSelecionado(null);
      setIdSessao('');
      setAssento('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:5016/ingressos/${idIngresso}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idSessao, assento }),
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar ingresso');
      setNotification({ type: 'success', message: 'Ingresso atualizado com sucesso!' });
      
      // Resetar o formulário após envio bem-sucedido
      setIdIngresso('');
      setIngressoSelecionado(null);
      setAssento('');
      setIdSessao('');
    } catch (erro) {
      console.error('Erro ao atualizar ingresso:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar ingresso. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Editar Ingresso</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingressoId">ID do Ingresso:</label>
        <select id="ingressoId" value={idIngresso} onChange={handleSessaoChange}>
          <option value="">Selecione um ingresso</option>
          {ingressos.map(ingresso => (
            <option key={ingresso.id} value={ingresso.id}>{ingresso.id}</option>
          ))}
        </select>

        {ingressoSelecionado && (
          <>
             <label htmlFor="sessaoId">ID da Sessão:</label>
            <input
            type="text"
            id="sessaoId"
            value={idSessao}
            disabled
            />

            <label htmlFor="assento">Assento:</label>
            <input
              type="text"
              id="assento"
              name="assento"
              value={assento}
              onChange={(e) => setAssento(e.target.value)}
              required
            />

            <button type="submit">Salvar</button>
          </>
        )}
      </form>
    </div>
  );
}

export default EditarIngresso;
