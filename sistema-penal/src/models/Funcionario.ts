import { Pessoa } from "./abstract/Pessoa";
import type { Role } from "./enum/Role";

export class Funcionario extends Pessoa {
  email: string;
  papel: Role;
  senha: string;

  constructor(
    nome: string,
    dataNascimento: Date,
    cpf: string,
    email: string,
    papel: Role,
    senha: string,
    id?: string,
  ) {
    super(nome, dataNascimento, cpf, id);
    this.email = email;
    this.papel = papel;
    this.senha = senha;
  }
}
