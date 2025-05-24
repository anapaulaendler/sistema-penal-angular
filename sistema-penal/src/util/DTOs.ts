import type { Role } from "../models/enum/Role";
import { Funcionario } from "../models/Funcionario";
import { Prisioneiro } from "../models/Prisioneiro";
import { mapDiaDeTrabalho, mapEstudo, mapLivro } from "./Mappers";

export function funcionarioDTO(dados: any): Funcionario {
  return new Funcionario(
    dados.idados,
    dados.nome,
    new Date(dados.dataNascimento),
    dados.cpf,
    dados.email,
    dados.papel as Role,
    dados.senha,
  );
}

export function prisioneiroDTO(dados: any): Prisioneiro {
  return new Prisioneiro(
    dados.id,
    dados.nome,
    dados.dataNascimento,
    dados.cpf,
    dados.descricaoSentenca,
    new Date(dados.diaDeChegada),
    new Date(dados.diaDeSaidaOriginal),
    new Date(dados.diaDeSaidaAtualizado),
    dados.contadorDeLivros,
    dados.anoAtual,
    mapLivro(dados.livros),
    mapEstudo(dados.estudos),
    mapDiaDeTrabalho(dados.diasDeTrabalho),
  );
}
