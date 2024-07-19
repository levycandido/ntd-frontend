export class Operation {
  id: number | undefined;
  type: string;
  cost: number | undefined;

  constructor(id?: number, type?: string, cost?: number) {
    this.id = id;
    this.type = type;
    this.cost = cost;
  }
}
