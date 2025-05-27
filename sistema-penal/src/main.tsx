import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import ListarFuncionarios from "./components/funcionario/ListarFuncionarios";
import EditarFuncionario from "./components/funcionario/EditarFuncionario";
import ListarPrisioneiros from "./components/prisioneiro/ListarPrisioneiros";
import EditarPrisioneiro from "./components/prisioneiro/EditarPrisioneiro";
import CadastrarFuncionario from "./components/funcionario/CadastrarFuncionario";
import CadastrarPrisioneiro from "./components/prisioneiro/CadastrarPrisioneiro";
import Listar from "./pages/Listar";
import Cadastrar from "./pages/Cadastrar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/listar",
        element: <Listar />,
        children: [
          {
            path: "/listar/funcionario",
            element: <ListarFuncionarios />,
            children: [
              {
                path: "/listar/funcionario/editar/:cpf",
                element: <EditarFuncionario />,
              },
            ],
          },
          {
            path: "/listar/prisioneiro",
            element: <ListarPrisioneiros />,
            children: [
              {
                path: "/listar/prisioneiro/editar/:cpf",
                element: <EditarPrisioneiro />,
              },
            ],
          },
        ],
      },
      {
        path: "/cadastrar",
        element: <Cadastrar />,
        children: [
          {
            path: "/cadastrar/funcionario",
            element: <CadastrarFuncionario />,
          },
          {
            path: "/cadastrar/prisioneiro",
            element: <CadastrarPrisioneiro />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
