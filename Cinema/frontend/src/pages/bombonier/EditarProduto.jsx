import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const EditarProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [produtoId, setProdutoId] = useState('');
  const [produtoNome, setProdutoNome] = useState('');
  const [valor, setValor] = useState('');
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

  const handleProdutoChange = (e) => {
    const id = e.target.value;
    setProdutoId(id);
    const produto = produtos.find(produto => produto.id === parseInt(id));
    if (produto) {
      setProdutoSelecionado(produto);
      setProdutoNome(produto.produto);
      setValor(produto.valor);
    } else {
      setProdutoSelecionado(null);
      setProdutoNome('');
      setValor('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produtoData = {
      id: produtoId,
      produto: produtoNome,
      valor: parseFloat(valor),
    };

    try {
      const resposta = await fetch(`http://localhost:5016/bombonieres/${produtoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar produto');
      setNotification({ type: 'success', message: 'Produto atualizado com sucesso!' });

      // Resetar o formulário após envio bem-sucedido
      setProdutoId('');
      setProdutoSelecionado(null);
      setProdutoNome('');
      setValor('');
    } catch (erro) {
      console.error('Erro ao atualizar produto:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar produto. Tente novamente.' });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Editar Produto</h1>
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
        {produtoSelecionado && (
          <>
            <label htmlFor="produtoNome">Produto:</label>
            <input
              type="text"
              id="produtoNome"
              value={produtoNome}
              onChange={(e) => setProdutoNome(e.target.value)}
              required
            />
            <label htmlFor="valor">Valor:</label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
            <button type="submit">Salvar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditarProduto;
