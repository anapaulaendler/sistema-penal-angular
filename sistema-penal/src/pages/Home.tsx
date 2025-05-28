import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="header">
        <h1 className="logo">Sistema Penal</h1>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/listar/funcionario">Listar Funcionários</Link>
            </li>
            <li>
              <Link to="/listar/prisioneiro">Listar Prisioneiros</Link>
            </li>
            <li>
              <Link to="/cadastrar/funcionario">Cadastrar Funcionário</Link>
            </li>
            <li>
              <Link to="/cadastrar/prisioneiro">Cadastrar Prisioneiro</Link>
            </li>
            <li>
              <Link to="/atividades/add-atividade">Cadastrar Atividade</Link>
            </li>
            <li>
              <Link to="/atividades/listar-atividades">Listar Atividades</Link>
            </li>
            <li>
              <Link to="/atividades/listar-atividades-prisioneiro">
                Listar Atividades por Prisioneiro
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
