import React, { useState } from 'react';
import Notification from '../../components/Notification';

const AdicionarUsuario = () => {
  // Estados para os campos de entrada
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
  const [notification, setNotification] = useState(null);
  const [erro, setErro] = useState(null);

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto com os dados do novo usuário
    const novoUsuario = {
      nome,
      senha,
      perfil
    };

    try {
      // Envia a requisição POST para criar o usuário
      const resposta = await fetch('http://localhost:5016/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
      });

      // Verifica se a resposta foi bem-sucedida
      if (!resposta.ok) throw new Error('Erro ao adicionar usuário');

      // Exibe a notificação de sucesso
      setNotification({ type: 'success', message: 'Usuário adicionado com sucesso!' });

      // Limpa os campos de entrada
      setNome('');
      setSenha('');
      setPerfil('');
      setErro(null);
    } catch (erro) {
      // Em caso de erro, exibe a notificação de erro
      console.error('Erro ao adicionar usuário:', erro);
      setNotification({ type: 'error', message: 'Erro ao adicionar usuário. Tente novamente.' });
      setErro(erro.message);
    }

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="main-content">
      <h1>Adicionar Usuário</h1>
      
      {/* Exibe a notificação caso haja */}
      {notification && <Notification type={notification.type} message={notification.message} />}
      
      {/* Formulário para adicionar um novo usuário */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Adicionar</button>
      </form>

      {/* Exibe o erro, se houver */}
      {erro && <p>Erro: {erro}</p>}
    </div>
  );
};

export default AdicionarUsuario;
