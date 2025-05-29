import React, { useState, useEffect } from 'react';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);

  // Função para carregar a lista de usuários ao montar o componente
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const resposta = await fetch('http://localhost:5016/usuarios');
        if (!resposta.ok) throw new Error('Erro ao buscar usuários');
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
        setErro(erro.message);
      }
    }
    fetchUsuarios();
  }, []);

  return (
    <div className="main-content">
      <h1>Lista de Usuários</h1>
      {erro && <p>Erro: {erro}</p>} {/* Exibe erro caso ocorra */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.perfil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
