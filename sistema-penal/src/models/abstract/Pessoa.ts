import type { IEntity } from "../interface/IEntity";

export abstract class Pessoa implements IEntity {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  id?: string;

  constructor(nome: string, dataNascimento: Date, cpf: string, id?: string) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
  }
}
