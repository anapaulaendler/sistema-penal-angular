import { Estudo } from "../../models/Estudo";

export async function GetEstudoByPrisioneiroId(prisioneiroId: string) {
  try {
    const resposta = await fetch(
      `http://localhost:5034/estudos/${prisioneiroId}`,
    );
    if (!resposta.ok)
      throw new Error(`Erro ao buscar estudo: ${resposta.statusText}`);

    const dados = await resposta.json();
    const estudos: Estudo[] = dados.map((estudo: Estudo) => {
      return new Estudo(
        estudo.id,
        new Date(estudo.data),
        estudo.prisioneiroId,
        estudo.prisioneiro,
        estudo.materia,
      );
    });

    return estudos;
  } catch (error) {
    console.error("Erro ao buscar estudo:", error);
    throw error;
  }
}
