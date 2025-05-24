import { Funcionario } from "../../models/Funcionario";
import baseURL from "../../util/Api";
import { funcionarioDTO } from "../../util/DTOs";
import { mapFuncionario } from "../../util/Mappers";

export async function CreateFuncionario(funcionario: Funcionario) {
  try {
    const resposta = await fetch(`${baseURL}/funcionarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao criar funcionario: ${resposta.statusText}`);
    const dados = await resposta.json();
    return console.log("Funcionario criado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao criar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarioById(
  funcionarioId: string,
): Promise<Funcionario> {
  try {
    const resposta = await fetch(
      `http://localhost:5034/funcionarios/id/${funcionarioId}`,
    );
    if (!resposta.ok)
      throw new Error(`Erro ao buscar funcionario: ${resposta.statusText}`);

    const dados = await resposta.json();
    const funcionario: Funcionario = funcionarioDTO(dados);

    return funcionario;
  } catch (error) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarioByCpf(cpf: string): Promise<Funcionario> {
  try {
    const resposta = await fetch(
      `http://localhost:5034/funcionarios/cpf/${cpf}`,
    );
    if (!resposta.ok)
      throw new Error(`Erro ao buscar funcionario: ${resposta.statusText}`);

    const dados = await resposta.json();
    const funcionario: Funcionario = funcionarioDTO(dados);

    return funcionario;
  } catch (error) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
}

// export async function UpdateFuncionarioAsync(funcionario: Funcionario) {
//   try {
//     const resposta = await fetch(`${baseURL}/funcionarios`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(funcionario),
//     });
//     if (!resposta.ok)
//       throw new Error(`Erro ao atualizar funcionario: ${resposta.statusText}`);
//     const dados = await resposta.json();
//     return console.log("Funcionario atualizado com sucesso:", dados);
//   } catch (error) {
//     console.error("Erro ao atualizar funcionario:", error);
//     throw error;
//   }
// }

export async function GetFuncionarios(): Promise<Funcionario[]> {
  try {
    const resposta = await fetch(`${baseURL}/funcionarios`);
    if (!resposta.ok)
      throw new Error(`Erro ao buscar funcionarios: ${resposta.statusText}`);

    const dados = await resposta.json();
    const funcionarios: Funcionario[] = mapFuncionario(dados);

    return funcionarios;
  } catch (error) {
    console.error("Erro ao buscar funcionarios:", error);
    throw error;
  }
}

export async function DeleteFuncionario(id: string) {
  try {
    const resposta = await fetch(`http://localhost:5034/funcionarios/${id}`, {
      method: "DELETE",
    });
    if (!resposta.ok)
      throw new Error(`Erro ao deletar funcionario: ${resposta.statusText}`);

    const dados = await resposta.json();

    return console.log(
      `Funcionario ${dados.nome} deletado com sucesso!`,
      dados,
    );
  } catch (error) {
    console.error("Erro ao deletar funcionario:", error);
    throw error;
  }
}
