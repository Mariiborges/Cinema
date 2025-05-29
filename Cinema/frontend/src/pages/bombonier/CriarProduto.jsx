import React, { useState } from 'react';
import Notification from '../../components/Notification';

const AdicionarProduto = () => {
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      produto,
      valor: parseFloat(valor)
    };

    try {
      const resposta = await fetch('http://localhost:5016/bombonieres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
      });

      if (!resposta.ok) throw new Error('Erro ao adicionar produto');
      setNotification({ type: 'success', message: 'Produto adicionado com sucesso!' });
      setProduto('');
      setValor('');
      setErro(null);
    } catch (erro) {
      console.error('Erro ao adicionar produto:', erro);
      setNotification({ type: 'error', message: 'Erro ao adicionar produto. Tente novamente.' });
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Adicionar Produto</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="produto">Produto:</label>
          <input
            type="text"
            id="produto"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      {erro && <p>Erro: {erro}</p>}
    </div>
  );
};

export default AdicionarProduto;
