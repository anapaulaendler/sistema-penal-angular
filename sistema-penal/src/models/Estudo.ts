import { Atividade } from "./abstract/Atividade";
import type { Prisioneiro } from "./Prisioneiro";

export class Estudo extends Atividade {
  materia: string;

  constructor(
    id: string,
    data: Date,
    prisioneiroId: string,
    prisioneiro: Prisioneiro,
    materia: string,
  ) {
    super(id, data, prisioneiroId, prisioneiro);
    this.materia = materia;
  }
}
