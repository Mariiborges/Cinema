import React, { useEffect, useState } from 'react';

function ListaDeIngressos() {
  const [ingressos, setIngressos] = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaSessoes = await fetch('http://localhost:5016/sessoes');
        if (!respostaSessoes.ok) throw new Error('Erro ao buscar sessões');
        const dadosSessoes = await respostaSessoes.json();

        const respostaIngressos = await fetch('http://localhost:5016/ingressos');
        if (!respostaIngressos.ok) throw new Error('Erro ao buscar ingressos');
        const dadosIngressos = await respostaIngressos.json();

        setIngressos(dadosIngressos);
        setSessoes(dadosSessoes);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      }
    }
    buscarDados();
  }, []);

  return (
    <div>
      <h1>Lista de Ingressos</h1>
      {erro && <p>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID da Sessão</th>
            <th>Assento</th>
          </tr>
        </thead>
        <tbody>
          {ingressos.map((ingresso) => (
            <tr key={ingresso.id}>
              <td>{ingresso.id}</td>
              <td>{ingresso.idSessao}</td>
              <td>{ingresso.assento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaDeIngressos;
