import React from "react";

const ListarFuncionarios = () => {
  async function getFuncionarios() {
    const resposta = await fetch("http://localhost:5034/funcionarios");
    const data = await resposta.json();
  }

  return <div></div>;
};

export default ListarFuncionarios;
