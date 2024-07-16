export class Record {
  id?: number;
  userId: string;
  operation: string;
  amount:number;
  firstValue: number;
  secValue: number;
  userBalance: number;
  operationResponse: number;
  timestamp: Date;

  constructor(
  userId: string,
  operation: string,
  amount: number,
  firstValue: number,
  secValue: number,
  userBalance: number,
  operationResponse: number,
  timestamp: Date
  ) {
    this.userId = userId;
    this.operation = operation;
    this.amount = amount;
    this.firstValue = firstValue;
    this.secValue = secValue;
    this.userBalance = userBalance;
    this.operationResponse = operationResponse;
    this.timestamp = timestamp;
  }
}
