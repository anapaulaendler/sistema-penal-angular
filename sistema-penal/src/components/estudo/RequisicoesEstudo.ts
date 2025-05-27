import { Estudo } from "../../models/Estudo";
import baseURL, { headers } from "../../util/Api";
import { mapEstudo } from "../../util/Mappers";

export async function CreateEstudoAsync(estudo: Estudo) {
  try {
    const resposta = await fetch(`${baseURL}/estudos`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(estudo),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao criar estudo: ${resposta.statusText}`);

    const dados = await resposta.json();
    return console.log("estudo criado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao criar estudo:", error);
    throw error;
  }
}

export async function GetEstudosByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<Estudo[]> {
  try {
    const resposta = await fetch(`${baseURL}/estudos/${prisioneiroId}`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar estudos: ${resposta.statusText}`);

    const dados = await resposta.json();
    const estudo: Estudo[] = mapEstudo(dados);

    return estudo;
  } catch (error) {
    console.error("Erro ao buscar estudos:", error);
    throw error;
  }
}

export async function GetEstudosAsync(): Promise<Estudo[]> {
  try {
    const resposta = await fetch(`${baseURL}/estudos`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar estudos: ${resposta.statusText}`);

    const dados = await resposta.json();
    const estudo: Estudo[] = mapEstudo(dados);

    return estudo;
  } catch (error) {
    console.error("Erro ao buscar estudos:", error);
    throw error;
  }
}
