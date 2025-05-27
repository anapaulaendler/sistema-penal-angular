import api from "../../api";
import { Prisioneiro } from "../../models/Prisioneiro";
import { prisioneiroDTO } from "../../util/DTOs";
import { mapPrisioneiro } from "../../util/Mappers";

export async function CreatePrisioneiroAsync(prisioneiro: Prisioneiro) {
  try {
    const resposta = await api.post("/prisioneiros", prisioneiro);
    console.log("Prisioneiro criado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao criar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneiroByIdAsync(
  prisioneiroId: string,
): Promise<Prisioneiro> {
  try {
    const resposta = await api.get(`/prisioneiros/id/${prisioneiroId}`);
    const prisioneiro: Prisioneiro = prisioneiroDTO(resposta.data);
    return prisioneiro;
  } catch (error: any) {
    console.error("Erro ao buscar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneiroByCpfAsync(
  cpf: string,
): Promise<Prisioneiro> {
  try {
    const resposta = await api.get(`/prisioneiros/cpf/${cpf}`);
    const prisioneiro: Prisioneiro = prisioneiroDTO(resposta.data);
    return prisioneiro;
  } catch (error: any) {
    console.error("Erro ao buscar prisioneiro:", error);
    throw error;
  }
}

export async function UpdatePrisioneiroAsync(
  prisioneiroId: string,
  prisioneiro: Prisioneiro,
) {
  try {
    const resposta = await api.put(
      `/prisioneiros/${prisioneiroId}`,
      prisioneiro,
    );
    console.log("Prisioneiro atualizado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao atualizar prisioneiro:", error);
    throw error;
  }
}

export async function DeletePrisioneiroAsync(id: string) {
  try {
    const resposta = await api.delete(`/prisioneiros/${id}`);
    console.log(
      `Prisioneiro ${resposta.data.nome} deletado com sucesso!`,
      resposta.data,
    );
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao deletar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneirosAsync(): Promise<Prisioneiro[]> {
  try {
    const resposta = await api.get("/prisioneiros");
    const prisioneiros: Prisioneiro[] = mapPrisioneiro(resposta.data);
    return prisioneiros;
  } catch (error: any) {
    console.error("Erro ao buscar prisioneiros:", error);
    throw error;
  }
}
