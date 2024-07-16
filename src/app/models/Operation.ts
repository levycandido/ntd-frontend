import {TypeEnum} from "./TypeEnum";

export class Operation {
  id: number | undefined;
  type: TypeEnum | undefined;
  cost: number | undefined;

  constructor(id?: number, type?: TypeEnum, cost?: number) {
    this.id = id;
    this.type = type;
    this.cost = cost;
  }
}
