import api from "../../api";
import { Estudo } from "../../models/Estudo";
import { mapEstudo } from "../../util/Mappers";

export async function CreateEstudoAsync(estudo: Estudo) {
  try {
    const resposta = await api.post("/estudos", estudo);
    console.log("Estudo criado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao criar estudo:", error);
    throw error;
  }
}

export async function GetEstudosByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<Estudo[]> {
  try {
    const resposta = await api.get(`/estudos/${prisioneiroId}`);
    const estudos: Estudo[] = mapEstudo(resposta.data);
    return estudos;
  } catch (error: any) {
    console.error("Erro ao buscar estudos:", error);
    throw error;
  }
}

export async function GetEstudosAsync(): Promise<Estudo[]> {
  try {
    const resposta = await api.get("/estudos");
    const estudos: Estudo[] = mapEstudo(resposta.data);
    return estudos;
  } catch (error: any) {
    console.error("Erro ao buscar estudos:", error);
    throw error;
  }
}
