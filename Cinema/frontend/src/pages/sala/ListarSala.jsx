import React, { useEffect, useState } from 'react';

const ListarSalas = () => {
  const [salas, setSalas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const resposta = await fetch('http://localhost:5016/salas');
        if (!resposta.ok) throw new Error('Erro ao buscar salas');
        const dados = await resposta.json();
        setSalas(dados);
      } catch (erro) {
        console.error('Erro ao buscar salas:', erro);
        setErro(erro.message);
      }
    }
    fetchSalas();
  }, []);

  return (
    <div className="main-content">
      <h1>Listar Salas</h1>
      {erro && <p>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quantidade de Cadeiras</th>
          </tr>
        </thead>
        <tbody>
          {salas.map(sala => (
            <tr key={sala.id}>
              <td>{sala.id}</td>
              <td>{sala.qntCadeiras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarSalas;
