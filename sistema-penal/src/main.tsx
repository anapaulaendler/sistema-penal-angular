import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddAtividade from "./components/atividade/AddAtividade";
import ListarAtividades from "./components/atividade/ListarAtividades";
import ListarAtividadesPrisioneiro from "./components/atividade/ListarAtividadesPrisioneiro";
import Login from "./components/funcionario/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/add-atividade",
        element: <AddAtividade />,
      },
      {
        path: "/listar-atividades",
        element: <ListarAtividades />,
      },
      {
        path: "/listar-atividade-prisioneiro",
        element: <ListarAtividadesPrisioneiro />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
