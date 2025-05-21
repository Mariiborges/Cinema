import React, { useState, useEffect } from 'react';

const ListarProduto = () => {
  const [produtos, setProdutos] = useState([]);
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

  return (
    <div className="main-content">
      <h1>Lista de Produtos</h1>
      {erro && <p>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.produto}</td>
              <td>{produto.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProduto;
