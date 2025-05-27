import { Prisioneiro } from "../../models/Prisioneiro";
import baseURL, { headers } from "../../util/Api";
import { prisioneiroDTO } from "../../util/DTOs";
import { mapPrisioneiro } from "../../util/Mappers";

export async function CreatePrisioneiroAsync(prisioneiro: Prisioneiro) {
  try {
    const resposta = await fetch(`${baseURL}/prisioneiros`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(prisioneiro),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao criar prisioneiro: ${resposta.statusText}`);
    const dados = await resposta.json();
    return console.log("Prisioneiro criado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao criar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneiroByIdAsync(
  prisioneiroId: string,
): Promise<Prisioneiro> {
  try {
    const resposta = await fetch(
      `${baseURL}/prisioneiros/id/${prisioneiroId}`,
      {
        headers: headers,
      },
    );
    if (!resposta.ok)
      throw new Error(`Erro ao buscar prisioneiro: ${resposta.statusText}`);

    const dados = await resposta.json();
    const prisioneiro: Prisioneiro = prisioneiroDTO(dados);

    return prisioneiro;
  } catch (error) {
    console.error("Erro ao buscar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneiroByCpfAsync(
  cpf: string,
): Promise<Prisioneiro> {
  try {
    const resposta = await fetch(`${baseURL}/prisioneiros/cpf/${cpf}`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar prisioneiro: ${resposta.statusText}`);

    const dados = await resposta.json();
    const prisioneiro: Prisioneiro = prisioneiroDTO(dados);

    return prisioneiro;
  } catch (error) {
    console.error("Erro ao buscar prisioneiro:", error);
    throw error;
  }
}

export async function UpdatePrisioneiroAsync(
  prisioneiroId: string,
  prisioneiro: Prisioneiro,
) {
  try {
    const resposta = await fetch(`${baseURL}/prisioneiros/${prisioneiroId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(prisioneiro),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao atualizar prisioneiro: ${resposta.statusText}`);

    const dados = await resposta.json();
    return console.log("Prisioneiro atualizado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao atualizar prisioneiro:", error);
    throw error;
  }
}

export async function DeletePrisioneiroAsync(id: string) {
  try {
    const resposta = await fetch(`${baseURL}/prisioneiros/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao deletar prisioneiro: ${resposta.statusText}`);

    const dados = await resposta.json();

    return console.log(
      `Prisioneiro ${dados.nome} deletado com sucesso!`,
      dados,
    );
  } catch (error) {
    console.error("Erro ao deletar prisioneiro:", error);
    throw error;
  }
}

export async function GetPrisioneirosAsync(): Promise<Prisioneiro[]> {
  try {
    const resposta = await fetch(`${baseURL}/prisioneiros`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar prisioneiros: ${resposta.statusText}`);

    const dados = await resposta.json();
    const prisioneiros: Prisioneiro[] = mapPrisioneiro(dados);

    return prisioneiros;
  } catch (error) {
    console.error("Erro ao buscar prisioneiros:", error);
    throw error;
  }
}
