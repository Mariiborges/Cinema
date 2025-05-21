import React, { useState, useEffect } from 'react';

const ListarFilme = () => {
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const resposta = await fetch('http://localhost:5016/filmes');
        if (!resposta.ok) throw new Error('Erro ao buscar filmes');
        const dados = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        console.error('Erro ao buscar filmes:', erro);
        setErro(erro.message);
      }
    }
    fetchFilmes();
  }, []);

  return (
    <div className="main-content">
      <h1>Lista de Filmes</h1>
      {erro && <p>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map(filme => (
            <tr key={filme.id}>
              <td>{filme.id}</td>
              <td>{filme.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarFilme;