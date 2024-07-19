import {Operation} from "./Operation";

export class Record {
  id?: number;
  userId: string;
  operation: Operation;
  amount:number;
  firstValue: number;
  secValue: number;
  userBalance: number;
  operationResponse: string;
  timestamp: Date;

  constructor(
  userId: string,
  operation: Operation,
  amount: number,
  firstValue: number,
  secValue: number,
  userBalance: number,
  operationResponse: string,
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
