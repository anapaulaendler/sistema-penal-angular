import { DiaDeTrabalho } from "../../models/DiaDeTrabalho";
import baseURL, { headers } from "../../util/Api";
import { mapDiaDeTrabalho } from "../../util/Mappers";

export async function CreateDiaDeTrabalhoAsync(diaDeTrabalho: DiaDeTrabalho) {
  try {
    const resposta = await fetch(`${baseURL}/diasDeTrabalho`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(diaDeTrabalho),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao criar dia de trabalho: ${resposta.statusText}`);

    const dados = await resposta.json();
    return console.log("dia de trabalho criado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao criar dia de trabalho:", error);
    throw error;
  }
}

export async function GetDiasDeTrabalhoByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<DiaDeTrabalho[]> {
  try {
    const resposta = await fetch(`${baseURL}/diasDeTrabalho/${prisioneiroId}`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(
        `Erro ao buscar dias de trabalho: ${resposta.statusText}`,
      );

    const dados = await resposta.json();
    const diasDeTrabalho: DiaDeTrabalho[] = mapDiaDeTrabalho(dados);

    return diasDeTrabalho;
  } catch (error) {
    console.error("Erro ao buscar dias de trabalho:", error);
    throw error;
  }
}

export async function GetDiasDeTrabalhoAsync(): Promise<DiaDeTrabalho[]> {
  try {
    const resposta = await fetch(`${baseURL}/diasDeTrabalho`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(
        `Erro ao buscar dias de trabalho: ${resposta.statusText}`,
      );

    const dados = await resposta.json();
    const diasDeTrabalho: DiaDeTrabalho[] = mapDiaDeTrabalho(dados);

    return diasDeTrabalho;
  } catch (error) {
    console.error("Erro ao buscar dias de trabalho:", error);
    throw error;
  }
}
