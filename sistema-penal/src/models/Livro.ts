import { Atividade } from "./abstract/Atividade";
import type { Prisioneiro } from "./Prisioneiro";

export class Livro extends Atividade {
  Isbn: string;

  constructor(
    id: string,
    data: Date,
    prisioneiroId: string,
    prisioneiro: Prisioneiro,
    Isbn: string,
  ) {
    super(id, data, prisioneiroId, prisioneiro);
    this.Isbn = Isbn;
  }
}