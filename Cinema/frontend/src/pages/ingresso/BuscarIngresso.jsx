import React, { useEffect, useState } from 'react';

function BuscarIngresso() {
  const [sessoes, setSessoes] = useState([]);
  const [ingressos, setIngressos] = useState([]);
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [idIngresso, setIdIngresso] = useState('');

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaIngressos = await fetch('http://localhost:5016/ingressos');
        if (!respostaIngressos.ok) throw new Error('Erro ao buscar ingressos');
        const dadosIngresso = await respostaIngressos.json();

        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        setSessoes(dadosSessoes);
        setIngressos(dadosIngresso);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  const handleBuscar = () => {
    const ingresso = ingressos.find(ingresso => ingresso.id === parseInt(idIngresso));
    if (ingresso) {
      const sessao = sessoes.find(sessao => sessao.id === ingresso.idSessao);
      setIngressoSelecionado({
        ...ingresso,
        idSessao: sessao ? sessao.id : ingresso.idSessao 
      });
    } else {
      setIngressoSelecionado(null);
    }
  };

  return (
    <div>
      <h1>Buscar Ingresso</h1>
      {erro && <p>Erro: {erro}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
        <label htmlFor="ingressoId">ID do Ingresso:</label>
        <select id="ingressoId" value={idIngresso} onChange={(e) => setIdIngresso(e.target.value)}>
          <option value="">Selecione um ingresso</option>
          {ingressos.map(ingresso => (
            <option key={ingresso.id} value={ingresso.id}>{ingresso.id}</option>
          ))}
        </select>
        <button type="submit">Buscar</button>
      </form>
      {ingressoSelecionado && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID da Sessão</th>
              <th>Assento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ingressoSelecionado.id}</td>
              <td>{ingressoSelecionado.idSessao}</td>
              <td>{ingressoSelecionado.assento}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BuscarIngresso;
