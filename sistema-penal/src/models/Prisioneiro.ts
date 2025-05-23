import { Pessoa } from "./abstract/Pessoa";
import type { DiaDeTrabalho } from "./DiaDeTrabalho";
import type { Estudo } from "./Estudo";
import type { Livro } from "./Livro";

export class Prisioneiro extends Pessoa {
  descricaoSentenca: string;
  diaDeChegada: Date;
  diaDeSaidaOriginal: Date;
  diaDeSaidaAtualizado: Date;
  contadorDeLivros: number;
  anoAtual: number;
  livros: Livro[];
  estudos: Estudo[];
  diasDeTrabalho: DiaDeTrabalho[];

  constructor(
    id: string,
    nome: string,
    dataNascimento: Date,
    cpf: string,
    descricaoSentenca: string,
    diaDeChegada: Date,
    diaDeSaidaOriginal: Date,
    diaDeSaidaAtualizado: Date,
    contadorDeLivros: number,
    anoAtual: number,
    livros: Livro[],
    estudos: Estudo[],
    diasDeTrabalho: DiaDeTrabalho[],
  ) {
    super(id, nome, dataNascimento, cpf);
    this.descricaoSentenca = descricaoSentenca;
    this.diaDeChegada = diaDeChegada;
    this.diaDeSaidaOriginal = diaDeSaidaOriginal;
    this.diaDeSaidaAtualizado = diaDeSaidaAtualizado;
    this.contadorDeLivros = contadorDeLivros;
    this.anoAtual = anoAtual;
    this.livros = livros;
    this.estudos = estudos;
    this.diasDeTrabalho = diasDeTrabalho;
  }
}
