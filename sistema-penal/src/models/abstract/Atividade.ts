import type { IEntity } from "../interface/IEntity";
import type { Prisioneiro } from "../Prisioneiro";

export abstract class Atividade implements IEntity {
  id: string;
  data: Date;
  prisioneiroId: string;
  prisioneiro: Prisioneiro;

  constructor(
    id: string,
    data: Date,
    prisioneiroId: string,
    prisioneiro: Prisioneiro,
  ) {
    this.id = id;
    this.data = data;
    this.prisioneiroId = prisioneiroId;
    this.prisioneiro = prisioneiro;
  }
}
