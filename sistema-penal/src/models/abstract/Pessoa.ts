import type { IEntity } from "../interface/IEntity";

export abstract class Pessoa implements IEntity {
  id: string;
  nome: string;
  dataNascimento: Date;
  cpf: string;

  constructor(id: string, nome: string, dataNascimento: Date, cpf: string) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
  }
}
