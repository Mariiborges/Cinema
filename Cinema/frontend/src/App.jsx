import './App.css';
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/Layout';

//Importar Sessão
import CriarSessao from './pages/sessao/CriarSessao';
import ListaDeSessoes from './pages/sessao/ListarSessao';
import BuscarSessao from './pages/sessao/BuscarSessao';
import EditarSessao from './pages/sessao/EditarSessao';
import ExcluirSessao from './pages/sessao/ExcluirSessao';

//Importar Sala
import CriarSala from './pages/sala/CriarSala';
import BuscarSala from './pages/sala/BuscarSala';
import EditarSala from './pages/sala/EditarSala';
import ExcluirSala from './pages/sala/ExcluirSala';
import ListarSala from './pages/sala/ListarSala';

//Importar Produto
import BuscarProduto from './pages/bombonier/BuscarProduto'
import CriarProduto from './pages/bombonier/CriarProduto'
import EditarProduto from './pages/bombonier/EditarProduto'
import ExcluirProduto from './pages/bombonier/ExcluirProduto'
import ListarProduto from './pages/bombonier/ListarProduto'

//Importar Produto
import BuscarFilme from './pages/filme/BuscarFilme'
import CriarFilme from './pages/filme/CriarFilme'
import EditarFilme from './pages/filme/EditarFilme'
import ExcluirFilme from './pages/filme/ExcluirFilme'
import ListarFilme from './pages/filme/ListarFilme'

import BuscarUsuario from './pages/usuario/BuscarUsuario'
import CriarUsuario from './pages/usuario/CriarUsuario'
import EditarUsuario from './pages/usuario/EditarUsuario'
import ExcluirUsuario from './pages/usuario/ExcluirUsuario'
import ListarUsuario from './pages/usuario/ListarUsuario'

//Importar Ingressos
import BuscarIngresso from './pages/ingresso/BuscarIngresso';
import CriarIngresso from './pages/ingresso/CriarIngresso';
import EditarIngresso from './pages/ingresso/EditarIngresso'; 
import ExcluirIngresso from './pages/ingresso/ExcluirIngresso';
import ListaDeIngressos from './pages/ingresso/ListarIngresso';


function App() {
  return (
    <Routes>
       <Route path="/" element={<AppLayout></AppLayout>} />
       <Route path="/criarSessao" element={<AppLayout><CriarSessao/></AppLayout>} />
       <Route path="/sessoes" element={<AppLayout><ListaDeSessoes /></AppLayout>} />
       <Route path="/buscarSessao" element={<AppLayout><BuscarSessao /></AppLayout>} />
       <Route path="/editarSessao" element={<AppLayout><EditarSessao /></AppLayout>} />
       <Route path="/excluirSessao" element={<AppLayout><ExcluirSessao /></AppLayout>} />
       
       <Route path="/criarSala" element={<AppLayout><CriarSala /></AppLayout>} />
       <Route path="/buscarSala" element={<AppLayout><BuscarSala /></AppLayout>} />
       <Route path="/editarSala" element={<AppLayout><EditarSala /></AppLayout>} />
       <Route path="/excluirSala" element={<AppLayout><ExcluirSala /></AppLayout>} />
       <Route path="/listarSala" element={<AppLayout><ListarSala /></AppLayout>} />

       <Route path="/criarProduto" element={<AppLayout><CriarProduto /></AppLayout>} />
       <Route path="/buscarProduto" element={<AppLayout><BuscarProduto /></AppLayout>} />
       <Route path="/editarProduto" element={<AppLayout><EditarProduto /></AppLayout>} />
       <Route path="/excluirProduto" element={<AppLayout><ExcluirProduto /></AppLayout>} />
       <Route path="/listarProduto" element={<AppLayout><ListarProduto /></AppLayout>} />

       <Route path="/criarFilme" element={<AppLayout><CriarFilme /></AppLayout>} />
       <Route path="/buscarFilme" element={<AppLayout><BuscarFilme /></AppLayout>} />
       <Route path="/editarFilme" element={<AppLayout><EditarFilme /></AppLayout>} />
       <Route path="/excluirFilme" element={<AppLayout><ExcluirFilme /></AppLayout>} />
       <Route path="/listarFilme" element={<AppLayout><ListarFilme /></AppLayout>} />

       <Route path="/criarUsuario" element={<AppLayout><CriarUsuario /></AppLayout>} />
       <Route path="/buscarUsuario" element={<AppLayout><BuscarUsuario /></AppLayout>} />
       <Route path="/editarUsuario" element={<AppLayout><EditarUsuario /></AppLayout>} />
       <Route path="/excluirUsuario" element={<AppLayout><ExcluirUsuario /></AppLayout>} />
       <Route path="/listarUsuario" element={<AppLayout><ListarUsuario /></AppLayout>} />
       
       <Route path="/criarIngresso" element={<AppLayout><CriarIngresso /></AppLayout>} />
       <Route path="/buscarIngresso" element={<AppLayout><BuscarIngresso /></AppLayout>} />
       <Route path="/editarIngresso" element={<AppLayout><EditarIngresso /></AppLayout>} />
       <Route path="/excluirIngresso" element={<AppLayout><ExcluirIngresso /></AppLayout>} />
       <Route path="/listarIngresso" element={<AppLayout><ListaDeIngressos /></AppLayout>} />
    </Routes>
  );
}

export default App;