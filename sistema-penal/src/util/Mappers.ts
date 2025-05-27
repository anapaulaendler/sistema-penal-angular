import { DiaDeTrabalho } from "../models/DiaDeTrabalho";
import type { Role } from "../models/enum/Role";
import { Estudo } from "../models/Estudo";
import { Funcionario } from "../models/Funcionario";
import { Livro } from "../models/Livro";
import { Prisioneiro } from "../models/Prisioneiro";

export function mapDiaDeTrabalho(dados: any[]): DiaDeTrabalho[] {
  return dados.map(
    (d: any) =>
      new DiaDeTrabalho(
        d.id,
        new Date(d.data),
        d.prisioneiroId,
        d.prisioneiro,
        d.descricao ?? "",
      ),
  );
}

export function mapEstudo(dados: any[]): Estudo[] {
  return dados.map(
    (d: any) =>
      new Estudo(
        d.id,
        new Date(d.data),
        d.prisioneiroId,
        d.prisioneiro,
        d.materia,
      ),
  );
}

export function mapLivro(dados: any[]): Livro[] {
  return dados.map(
    (d: any) =>
      new Livro(d.id, new Date(d.data), d.prisioneiroId, d.prisioneiro, d.Isbn),
  );
}

export function mapFuncionario(dados: any): Funcionario[] {
  return dados.map((d: any) => {
    // Garante que papel seja convertido corretamente
    const papelMap = {
      0: "Admin",
      1: "General",
      Admin: "Admin",
      General: "General",
    };

    const papelConvertido =
      papelMap[d.papel as keyof typeof papelMap] ?? d.papel;

    return new Funcionario(
      d.nome,
      new Date(d.dataNascimento),
      d.cpf,
      d.email,
      papelConvertido as Role,
      d.senha,
      d.id ?? undefined,
    );
  });
}

export function mapPrisioneiro(dados: any): Prisioneiro[] {
  return dados.map(
    (d: any) =>
      new Prisioneiro(
        d.nome,
        new Date(d.dataNascimento),
        d.cpf,
        d.descricaoSentenca,
        new Date(d.diaDeChegada),
        new Date(d.diaDeSaidaOriginal),
        new Date(d.diaDeSaidaAtualizado),
        d.contadorDeLivros,
        d.anoAtual,
        mapLivro(d.livros),
        mapEstudo(d.estudos),
        mapDiaDeTrabalho(d.diasDeTrabalho),
        d.id ?? undefined,
      ),
  );
}
