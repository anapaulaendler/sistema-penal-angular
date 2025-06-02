import api from "../../api";
import type { Role } from "../../models/enum/Role";
import { Funcionario } from "../../models/Funcionario";
import { funcionarioDTO } from "../../util/DTOs";
import { mapFuncionario } from "../../util/Mappers";

export async function CreateFuncionario(funcionario: Funcionario) {
  const dto = funcionarioToDTO(funcionario);

  try {
    const resposta = await api.post("/funcionarios", dto);
    console.log("Funcionario criado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao criar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarioById(
  funcionarioId: string,
): Promise<Funcionario> {
  try {
    const resposta = await api.get(`/funcionarios/id/${funcionarioId}`);
    const funcionario: Funcionario = funcionarioDTO(resposta.data);
    return funcionario;
  } catch (error: any) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarioByCpf(cpf: string): Promise<Funcionario> {
  try {
    const resposta = await api.get(`/funcionarios/cpf/${cpf}`);
    const funcionario: Funcionario = funcionarioDTO(resposta.data);
    return funcionario;
  } catch (error: any) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
}

export async function UpdateFuncionarioAsync(funcionario: Funcionario) {
  const dto = funcionarioToDTO(funcionario);
  console.log("DTO enviado:", funcionarioToDTO(funcionario));
  try {
    const resposta = await api.put("/funcionarios", dto);
    console.log("Funcionario atualizado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao atualizar funcionario:", error);
    throw error;
  }
}

export async function GetFuncionarios(): Promise<Funcionario[]> {
  try {
    const resposta = await api.get("/funcionarios");
    const funcionarios: Funcionario[] = mapFuncionario(resposta.data);
    return funcionarios;
  } catch (error: any) {
    console.error("Erro ao buscar funcionarios:", error);
    throw error;
  }
}

export async function DeleteFuncionario(id: string) {
  try {
    const resposta = await api.delete(`/funcionarios/${id}`);
    console.log(
      `Funcionario ${resposta.data.nome} deletado com sucesso!`,
      resposta.data,
    );
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao deletar funcionario:", error);
    throw error;
  }
}

function roleToEnumValue(papel: Role): number {
  console.log("Valor recebido em roleToEnumValue:", papel);
  switch (papel) {
    case "Admin":
      return 0;
    case "General":
      return 1;
    default:
      throw new Error("Papel inválido");
  }
}

function funcionarioToDTO(funcionario: Funcionario) {
  return {
    id: funcionario.id,
    nome: funcionario.nome,
    cpf: funcionario.cpf,
    dataNascimento: funcionario.dataNascimento,
    email: funcionario.email,
    senha: funcionario.senha,
    papel: roleToEnumValue(funcionario.papel),
  };
}
