import { Atividade } from "./abstract/Atividade";
import type { Prisioneiro } from "./Prisioneiro";

export class Estudo extends Atividade {
  Materia: string;

  constructor(
    id: string,
    data: Date,
    prisioneiroId: string,
    prisioneiro: Prisioneiro,
    Materia: string,
  ) {
    super(id, data, prisioneiroId, prisioneiro);
    this.Materia = Materia;
  }
}
