import api from "../../api";
import { Livro } from "../../models/Livro";
import { mapLivro } from "../../util/Mappers";

export async function CreateLivroAsync(livro: Livro) {
  try {
    const resposta = await api.post("/livros", livro);
    console.log("Livro criado com sucesso:", resposta.data);
    return resposta.data;
  } catch (error: any) {
    console.error("Erro ao criar livro:", error);
    throw error;
  }
}

export async function GetLivrosByPrisioneiroIdAsync(
  prisioneiroId: string,
): Promise<Livro[]> {
  try {
    const resposta = await api.get(`/livros/${prisioneiroId}`);
    const livros: Livro[] = mapLivro(resposta.data);
    return livros;
  } catch (error: any) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
}

export async function GetLivrosAsync(): Promise<Livro[]> {
  try {
    const resposta = await api.get("/livros");
    const livros: Livro[] = mapLivro(resposta.data);
    return livros;
  } catch (error: any) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
}
