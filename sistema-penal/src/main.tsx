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
import AddAtividade from "./components/atividade/AddAtividade";
import ListarAtividades from "./components/atividade/ListarAtividades";
import ListarAtividadesPrisioneiro from "./components/atividade/ListarAtividadesPrisioneiro";
import Login from "./components/funcionario/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
