import type { Role } from "../../models/enum/Role";
import { Funcionario } from "../../models/Funcionario";
import baseURL, { headers } from "../../util/Api";
import { funcionarioDTO } from "../../util/DTOs";
import { mapFuncionario } from "../../util/Mappers";

export async function CreateFuncionario(funcionario: Funcionario) {
  const dto = funcionarioToDTO(funcionario);

  try {
    const resposta = await fetch(`${baseURL}/funcionarios`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dto),
    });

    if (!resposta.ok)
      throw new Error(`Erro ao criar funcionario: ${resposta.statusText}`);

    const texto = await resposta.text();
    console.log("Funcionario criado com sucesso:", texto);
    return texto;
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
      {
        headers: headers,
      },
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
      {
        headers: headers,
      },
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

export async function UpdateFuncionarioAsync(funcionario: Funcionario) {
  try {
    const resposta = await fetch(`${baseURL}/funcionarios`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(funcionario),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao atualizar funcionario: ${resposta.statusText}`);
    const dados = await resposta.json();
    return console.log("Funcionario atualizado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao atualizar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarios(): Promise<Funcionario[]> {
  try {
    const resposta = await fetch(`${baseURL}/funcionarios`, {
      headers: headers,
    });
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
      headers: headers,
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

// Transforma o papel string ("Admin" ou "General") para o número correspondente
function roleToEnumValue(papel: Role): number {
  switch (papel) {
    case "Admin":
      return 0;
    case "General":
      return 1;
    default:
      throw new Error("Papel inválido");
  }
}

export function funcionarioToDTO(funcionario: Funcionario) {
  return {
    id: funcionario.id,
    nome: funcionario.nome,
    dataNascimento: funcionario.dataNascimento.toISOString(),
    cpf: funcionario.cpf,
    email: funcionario.email,
    senha: funcionario.senha,
    papel: roleToEnumValue(funcionario.papel),
  };
}
