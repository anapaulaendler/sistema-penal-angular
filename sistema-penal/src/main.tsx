import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // corrige aqui também
import ListarFuncionarios from "./components/funcionario/ListarFuncionarios";
import EditarFuncionario from "./components/funcionario/EditarFuncionario";
import ListarPrisioneiros from "./components/prisioneiro/ListarPrisioneiros";
import CadastrarFuncionario from "./components/funcionario/CadastrarFuncionario";
import Login from "./components/funcionario/Login";
import Home from "./pages/Home";
import DetalharPrisioneiro from "./components/prisioneiro/DetalharPrisioneiro";
import CadastrarPrisioneiro from "./components/prisioneiro/CadastrarPrisioneiro";
import AddAtividade from "./components/atividade/AddAtividade";
import ListarAtividades from "./components/atividade/ListarAtividades";
import ListarAtividadesPrisioneiro from "./components/atividade/ListarAtividadesPrisioneiro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "listar",
        element: <Home />,
        children: [
          {
            path: "funcionario",
            element: <ListarFuncionarios />,
            children: [
              {
                path: "editar/:cpf",
                element: <EditarFuncionario />,
              },
            ],
          },
          {
            path: "/listar/prisioneiro",
            element: <ListarPrisioneiros />,
            children: [
              {
                path: "detalhar/:id",
                element: <DetalharPrisioneiro />,
              },
            ],
          },
        ],
      },
      {
        path: "cadastrar",
        element: <Home />,
        children: [
          {
            path: "funcionario",
            element: <CadastrarFuncionario />,
          },
          {
            path: "prisioneiro",
            element: <CadastrarPrisioneiro />,
          },
        ],
      },
      {
        path: "atividades",
        element: <Home />,
        children: [
          {
            path: "add-atividade",
            element: <AddAtividade />,
          },
          {
            path: "listar-atividades",
            element: <ListarAtividades />,
          },
          {
            path: "listar-atividades-prisioneiro",
            element: <ListarAtividadesPrisioneiro />,
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
