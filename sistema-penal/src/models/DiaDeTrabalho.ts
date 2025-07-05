import { Atividade } from "./abstract/Atividade";
import type { Prisioneiro } from "./Prisioneiro";

export class DiaDeTrabalho extends Atividade {
  descricao?: string;

  constructor(
    id: string,
    data: Date,
    prisioneiroId: string,
    prisioneiro: Prisioneiro,
    descricao: string,
  ) {
    super(id, data, prisioneiroId, prisioneiro);
    this.descricao = descricao;
  }
}
