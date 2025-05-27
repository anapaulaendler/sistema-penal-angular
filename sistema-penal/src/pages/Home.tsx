import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <h1>Sistema Penal</h1>
        <nav>
          <ul>
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
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
