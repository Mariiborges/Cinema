import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

const EditarUsuario = () => {
  // Estados para controlar os dados do usuário
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [usuarioId, setUsuarioId] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
  const [notification, setNotification] = useState(null);

  // Carrega a lista de usuários quando o componente é montado
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

  // Atualiza o estado com os dados do usuário selecionado
  const handleUsuarioChange = (e) => {
    const id = e.target.value;
    setUsuarioId(id);

    // Busca o usuário selecionado
    const usuario = usuarios.find(usuario => usuario.id === parseInt(id));
    if (usuario) {
      setUsuarioSelecionado(usuario);
      setNome(usuario.nome);
      setSenha(usuario.senha);
      setPerfil(usuario.perfil);
    } else {
      setUsuarioSelecionado(null);
      setNome('');
      setSenha('');
      setPerfil('');
    }
  };

  // Função que envia os dados para atualização do usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto com os dados atualizados do usuário
    const usuarioData = {
      id: usuarioId,
      nome,
      senha,
      perfil
    };

    try {
      // Envia a requisição PUT para atualizar o usuário
      const resposta = await fetch(`http://localhost:5016/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),
      });

      if (!resposta.ok) throw new Error('Erro ao atualizar usuário');
      setNotification({ type: 'success', message: 'Usuário atualizado com sucesso!' });

      // Resetar o formulário após envio bem-sucedido
      setUsuarioId('');
      setUsuarioSelecionado(null);
      setNome('');
      setSenha('');
      setPerfil('');
    } catch (erro) {
      console.error('Erro ao atualizar usuário:', erro);
      setNotification({ type: 'error', message: 'Erro ao atualizar usuário. Tente novamente.' });
    }

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Editar Usuário</h1>
      
      {/* Exibe a notificação caso haja */}
      {notification && <Notification type={notification.type} message={notification.message} />}
      
      {/* Exibe erro caso haja */}
      {erro && <p>Erro: {erro}</p>}
      
      {/* Formulário para editar o usuário */}
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

        {/* Exibe os campos de edição somente se um usuário for selecionado */}
        {usuarioSelecionado && (
          <>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="perfil">Perfil:</label>
              <input
                type="text"
                id="perfil"
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                required
              />
            </div>
            <button type="submit">Salvar Alterações</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditarUsuario;
