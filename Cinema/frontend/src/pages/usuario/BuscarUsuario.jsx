import React, { useState } from 'react';
import Notification from '../../components/Notification';

const BuscarUsuario = () => {
  // Estados
  const [usuarioId, setUsuarioId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState(null);
  const [notification, setNotification] = useState(null);

  // Atualiza o estado `usuarioId` quando o valor da entrada de texto mudar
  const handleChange = (e) => {
    setUsuarioId(e.target.value);
  };

  // Envia a requisição para buscar o usuário específico
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fazendo a requisição para buscar um usuário específico pelo id
      const resposta = await fetch(`http://localhost:5016/usuarios/${usuarioId}`);
      if (!resposta.ok) throw new Error('Erro ao buscar usuário');
      const dados = await resposta.json();
      setUsuario(dados);
      setNotification({ type: 'success', message: 'Usuário encontrado com sucesso!' });
      setErro(null);
    } catch (erro) {
      console.error('Erro ao buscar usuário:', erro);
      setNotification({ type: 'error', message: 'Erro ao buscar usuário. Tente novamente.' });
      setUsuario(null);
      setErro(erro.message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Função para tratar a exibição de campos que podem ser nulos
  const renderField = (field) => {
    return field ? field : 'Não informado';
  };

  return (
    <div className="main-content">
      <h1>Buscar Usuário</h1>
      
      {/* Exibe a notificação caso haja */}
      {notification && <Notification type={notification.type} message={notification.message} />}
      
      {/* Formulário para selecionar um usuário específico */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuarioId">ID do Usuário:</label>
          <input
            type="number"
            id="usuarioId"
            value={usuarioId}
            onChange={handleChange}
            required
            placeholder="Digite o ID do usuário"
          />
        </div>
        <button type="submit">Buscar</button>
      </form>
      
      {/* Exibe erro, se houver */}
      {erro && <p>Erro: {erro}</p>}

      {/* Exibe os detalhes do usuário se encontrado */}
      {usuario && (
        <div>
          <h2>Detalhes do Usuário</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.id}</td>
                <td>{renderField(usuario.nome)}</td> {/* Exibe 'Não informado' caso nome seja null */}
                <td>{renderField(usuario.perfil)}</td> {/* Exibe 'Não informado' caso perfil seja null */}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarUsuario;
