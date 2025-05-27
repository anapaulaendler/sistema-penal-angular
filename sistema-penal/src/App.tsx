import { Link } from "react-router";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <header>
        <h1>Sistema Penal</h1>
        <nav>
          <ul>
            <li>
              <Link to="listar/funcionario">Listar</Link>
            </li>
            <li>
              <Link to="cadastrar/funcionario">Cadastrar</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default App;
