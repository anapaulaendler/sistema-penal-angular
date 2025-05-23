import { Pessoa } from "./abstract/Pessoa";
import type { Role } from "./enum/Role";

export class Funcionario extends Pessoa {
  email: string;
  papel: Role;
  senha: string;

  constructor(
    id: string,
    nome: string,
    dataNascimento: Date,
    cpf: string,
    email: string,
    papel: Role,
    senha: string,
  ) {
    super(id, nome, dataNascimento, cpf);
    this.email = email;
    this.papel = papel;
    this.senha = senha;
  }
}
