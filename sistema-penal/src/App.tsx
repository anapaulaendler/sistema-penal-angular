import { Outlet } from "react-router";
import ListarPrisioneiros from "./components/prisioneiro/ListarPrisioneiros";
import CadastrarFuncionario from "./components/funcionario/CadastrarFuncionario";

function App() {
  return (
    <>
      <Outlet />
      <CadastrarFuncionario />
    </>
  );
}

export default App;
