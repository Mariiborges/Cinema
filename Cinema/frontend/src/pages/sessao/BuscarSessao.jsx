import React, { useEffect, useState } from 'react';

function BuscarSessao() {
  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [erro, setErro] = useState(null);
  const [idSessao, setIdSessao] = useState('');

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        const respostaFilmes = await fetch('http://localhost:5016/filmes');
        if (!respostaFilmes.ok) throw new Error('Erro ao buscar filmes');
        const dadosFilmes = await respostaFilmes.json();

        setSessoes(dadosSessoes);
        setFilmes(dadosFilmes);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  const handleBuscar = () => {
    const sessao = sessoes.find(sessao => sessao.id === parseInt(idSessao));
    if (sessao) {
      const filme = filmes.find(filme => filme.id === sessao.idFilme);
      setSessaoSelecionada({ ...sessao, tituloFilme: filme ? filme.titulo : 'Desconhecido' });
    } else {
      setSessaoSelecionada(null);
    }
  };

  return (
    <div>
      <h1>Buscar Sessão</h1>
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
        <label htmlFor="sessaoId">ID da Sessão:</label>
        <select id="sessaoId" value={idSessao} onChange={(e) => setIdSessao(e.target.value)}>
          <option value="">Selecione uma sessão</option>
          {sessoes.map(sessao => (
            <option key={sessao.id} value={sessao.id}>{sessao.id}</option>
          ))}
        </select>
        <button type="submit">Buscar</button>
      </form>
      {sessaoSelecionada && (
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
            <tr>
              <td>{sessaoSelecionada.id}</td>
              <td>{sessaoSelecionada.tituloFilme}</td>
              <td>{sessaoSelecionada.idSala}</td>
              <td>{new Date(sessaoSelecionada.data).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BuscarSessao;
