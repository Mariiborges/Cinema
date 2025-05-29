import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notification';

const BuscarProduto = () => {
  const [produtoId, setProdutoId] = useState('');
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const resposta = await fetch('http://localhost:5016/bombonieres');
        if (!resposta.ok) throw new Error('Erro ao buscar produtos');
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
        setErro(erro.message);
      }
    }
    fetchProdutos();
  }, []);

  const handleChange = (e) => {
    setProdutoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/bombonieres/${produtoId}`);
      if (!resposta.ok) throw new Error('Erro ao buscar produto');
      const dados = await resposta.json();
      setProduto(dados);
      setNotification({ type: 'success', message: 'Produto encontrado com sucesso!' });
      setErro(null);
    } catch (erro) {
      console.error('Erro ao buscar produto:', erro);
      setNotification({ type: 'error', message: 'Erro ao buscar produto. Tente novamente.' });
      setProduto(null);
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Buscar Produto</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="produtoId">ID do Produto:</label>
          <select id="produtoId" value={produtoId} onChange={handleChange} required>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Buscar</button>
      </form>
      {erro && <p>Erro: {erro}</p>}
      {produto && (
        <div>
          <h2>Detalhes do Produto</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{produto.id}</td>
                <td>{produto.produto}</td>
                <td>{produto.valor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarProduto;
