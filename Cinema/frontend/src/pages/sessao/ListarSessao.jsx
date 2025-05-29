import React, { useEffect, useState } from 'react';

function ListaDeSessoes() {
  const [sessoes, setSessoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        const respostaFilmes = await fetch('http://localhost:5016/filmes');
        if (!respostaFilmes.ok) throw new Error('Erro ao buscar filmes');
        const dadosFilmes = await respostaFilmes.json();

        // Combine as sessões com os títulos dos filmes
        const sessoesComFilmes = dadosSessoes.map(sessao => {
          const filme = dadosFilmes.find(filme => filme.id === sessao.idFilme);
          return { ...sessao, tituloFilme: filme ? filme.titulo : 'Desconhecido' };
        });

        setSessoes(sessoesComFilmes);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  return (
    <div>
      <h1>Lista de Sessões Disponíveis</h1>
      {erro && <p>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título do Filme</th>
            <th>ID da Sala</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((sessao) => (
            <tr key={sessao.id}>
              <td>{sessao.id}</td>
              <td>{sessao.tituloFilme}</td>
              <td>{sessao.idSala}</td>
              <td>{new Date(sessao.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaDeSessoes;
