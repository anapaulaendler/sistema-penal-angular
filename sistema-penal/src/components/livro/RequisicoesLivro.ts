import { Livro } from "../../models/Livro";
import baseURL, { headers } from "../../util/Api";
import { mapLivro } from "../../util/Mappers";

export async function CreateLivroAsync(livro: Livro) {
  try {
    const resposta = await fetch(`${baseURL}/livros`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(livro),
    });
    if (!resposta.ok)
      throw new Error(`Erro ao criar livro: ${resposta.statusText}`);

    const dados = await resposta.json();
    return console.log("livro criado com sucesso:", dados);
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    throw error;
  }
}

export async function GetLivrosByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<Livro[]> {
  try {
    const resposta = await fetch(`${baseURL}/livros/${prisioneiroId}`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar livros: ${resposta.statusText}`);

    const dados = await resposta.json();
    const livro: Livro[] = mapLivro(dados);

    return livro;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
}

export async function GetLivrosAsync() {
  try {
    const resposta = await fetch(`${baseURL}/livros`, {
      headers: headers,
    });
    if (!resposta.ok)
      throw new Error(`Erro ao buscar livros: ${resposta.statusText}`);

    const dados = await resposta.json();
    const livro: Livro[] = mapLivro(dados);

    return livro;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
}
