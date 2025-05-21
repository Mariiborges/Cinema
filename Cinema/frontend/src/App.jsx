import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";

//Importar Bombonier
import BuscarProduto from "./pages/bombonier/BuscarProduto";
import CriarProduto from "./pages/bombonier/CriarProduto";
import EditarProduto from "./pages/bombonier/EditarProduto";
import ExcluirProduto from "./pages/bombonier/ExcluirProduto";
import ListarProduto from "./pages/bombonier/ListarProduto";

//Importar Filme
import BuscarFilme from "./pages/filme/BuscarFilme";
import CriarFilme from "./pages/filme/CriarFilme";
import EditarFilme from "./pages/filme/EditarFilme";
import ExcluirFilme from "./pages/filme/ExcluirFilme";
import ListarFilme from "./pages/filme/ListarFilme";

//Importar Ingressos
import BuscarIngresso from "./pages/ingresso/BuscarIngresso";
import CriarIngresso from "./pages/ingresso/CriarIngresso";
import EditarIngresso from "./pages/ingresso/EditarIngresso";
import ExcluirIngresso from "./pages/ingresso/ExcluirIngresso";
import ListaDeIngressos from "./pages/ingresso/ListarIngresso";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout></AppLayout>} />

      <Route
        path="/criarProduto"
        element={
          <AppLayout>
            <CriarProduto />
          </AppLayout>
        }
      />
      <Route
        path="/buscarProduto"
        element={
          <AppLayout>
            <BuscarProduto />
          </AppLayout>
        }
      />
      <Route
        path="/editarProduto"
        element={
          <AppLayout>
            <EditarProduto />
          </AppLayout>
        }
      />
      <Route
        path="/excluirProduto"
        element={
          <AppLayout>
            <ExcluirProduto />
          </AppLayout>
        }
      />
      <Route
        path="/listarProduto"
        element={
          <AppLayout>
            <ListarProduto />
          </AppLayout>
        }
      />

      <Route
        path="/criarFilme"
        element={
          <AppLayout>
            <CriarFilme />
          </AppLayout>
        }
      />
      <Route
        path="/buscarFilme"
        element={
          <AppLayout>
            <BuscarFilme />
          </AppLayout>
        }
      />
      <Route
        path="/editarFilme"
        element={
          <AppLayout>
            <EditarFilme />
          </AppLayout>
        }
      />
      <Route
        path="/excluirFilme"
        element={
          <AppLayout>
            <ExcluirFilme />
          </AppLayout>
        }
      />
      <Route
        path="/listarFilme"
        element={
          <AppLayout>
            <ListarFilme />
          </AppLayout>
        }
      />
      <Route
        path="/criarIngresso"
        element={
          <AppLayout>
            <CriarIngresso />
          </AppLayout>
        }
      />
      <Route
        path="/buscarIngresso"
        element={
          <AppLayout>
            <BuscarIngresso />
          </AppLayout>
        }
      />
      <Route
        path="/editarIngresso"
        element={
          <AppLayout>
            <EditarIngresso />
          </AppLayout>
        }
      />
      <Route
        path="/excluirIngresso"
        element={
          <AppLayout>
            <ExcluirIngresso />
          </AppLayout>
        }
      />
      <Route
        path="/listarIngresso"
        element={
          <AppLayout>
            <ListaDeIngressos />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
