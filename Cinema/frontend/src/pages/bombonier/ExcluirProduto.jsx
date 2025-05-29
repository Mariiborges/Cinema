import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const ExcluirProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

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

  const handleProdutoChange = (e) => {
    setProdutoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/bombonieres/${produtoId}`, {
        method: 'DELETE',
      });
      if (!resposta.ok) throw new Error('Erro ao excluir produto');
      setNotification({ type: 'success', message: 'Produto excluído com sucesso!' });
      setErro(null);

      // Remover o produto excluído da lista de produtos
      setProdutos(produtos.filter(produto => produto.id !== parseInt(produtoId)));
      setProdutoId('');
    } catch (erro) {
      console.error('Erro ao excluir produto:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir produto. Tente novamente.' });
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Produto</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="produtoId">ID do Produto:</label>
          <select id="produtoId" value={produtoId} onChange={handleProdutoChange} required>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
};

export default ExcluirProduto;
