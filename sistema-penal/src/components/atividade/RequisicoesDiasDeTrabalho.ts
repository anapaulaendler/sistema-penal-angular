import api from "../../api";
import { DiaDeTrabalho } from "../../models/DiaDeTrabalho";
import { mapDiaDeTrabalho } from "../../util/Mappers";

export async function CreateDiaDeTrabalhoAsync(diaDeTrabalho: DiaDeTrabalho) {
  try {
    const resposta = await api.post("/dias-de-trabalho", diaDeTrabalho);
    console.log("Dia de trabalho criado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao criar dia de trabalho:", error);
    throw error;
  }
}

export async function GetDiasDeTrabalhoByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<DiaDeTrabalho[]> {
  try {
    const resposta = await api.get(`/dias-de-trabalho/${prisioneiroId}`);
    const diasDeTrabalho: DiaDeTrabalho[] = mapDiaDeTrabalho(resposta.data);
    return diasDeTrabalho;
  } catch (error: any) {
    console.error("Erro ao buscar dias de trabalho:", error);
    throw error;
  }
}

export async function GetDiasDeTrabalhoAsync(): Promise<DiaDeTrabalho[]> {
  try {
    const resposta = await api.get("/dias-de-trabalho");
    const diasDeTrabalho: DiaDeTrabalho[] = mapDiaDeTrabalho(resposta.data);
    return diasDeTrabalho;
  } catch (error: any) {
    console.error("Erro ao buscar dias de trabalho:", error);
    throw error;
  }
}
