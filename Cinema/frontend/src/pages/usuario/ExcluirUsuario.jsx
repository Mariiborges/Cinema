import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const ExcluirUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  // Carrega a lista de usuários ao montar o componente
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

  // Função para lidar com a seleção do ID do usuário
  const handleUsuarioChange = (e) => {
    setUsuarioId(e.target.value);
  };

  // Função para lidar com a submissão do formulário de exclusão
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia requisição DELETE para o backend
      const resposta = await fetch(`http://localhost:5016/usuarios/${usuarioId}`, {
        method: 'DELETE',
      });
      if (!resposta.ok) throw new Error('Erro ao excluir usuário');
      setNotification({ type: 'success', message: 'Usuário excluído com sucesso!' });
      setErro(null);

      // Atualiza a lista removendo o usuário excluído
      setUsuarios(usuarios.filter(usuario => usuario.id !== parseInt(usuarioId)));
      setUsuarioId('');
    } catch (erro) {
      console.error('Erro ao excluir usuário:', erro);
      setNotification({ type: 'error', message: 'Erro ao excluir usuário. Tente novamente.' });
      setErro(erro.message);
    }

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Excluir Usuário</h1>

      {/* Exibe a notificação caso haja */}
      {notification && <Notification type={notification.type} message={notification.message} />}
      
      {/* Exibe erro caso haja */}
      {erro && <p>Erro: {erro}</p>}
      
      {/* Formulário de exclusão */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuarioId">ID do Usuário:</label>
          <select id="usuarioId" value={usuarioId} onChange={handleUsuarioChange} required>
            <option value="">Selecione um usuário</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
};

export default ExcluirUsuario;
