import {Component, OnInit} from '@angular/core';
import {TypeEnum} from '../DTO/TypeEnum';
import {RecordService} from "../services/RecordService";
import {UserInfoService} from "../services/UserNameService";
import {Router} from "@angular/router";
import {Record} from "../entity/Record";
import {Operation} from "../entity/Operation";
import {catchError, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {NotificationService} from "../services/NotificationService";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  displayValue: string = '0';
  private firstOperand: number | null = null;
  private secondOperand: number | null = null;
  private currentOperator: TypeEnum | null = null;
  private waitingForSecondOperand: boolean = false;
  protected userName: string;
  protected balance: number = 0;
  public stringCreated = null;

  TypeEnum = TypeEnum;
  isLoggedIn: boolean;
  private createString: boolean;

  constructor(private recordService: RecordService,
              private userInfoService: UserInfoService,
              private notificationService: NotificationService,
              private decimalPipe: DecimalPipe,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userInfoService.userName$.subscribe(userName => {
      this.userName = userName;
    });

    this.userInfoService.balance$.subscribe(balance => {
      this.balance = balance;
    });

    this.isLoggedIn = this.isLogged();
  }

  private isLogged(): boolean {
    if (this.userName || this.userName != 'undefined') {
      return this.isLoggedIn = true;
    }
    this.router.navigate(['/login']);
  }

  inputNumber(num: number): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = String(num);
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? String(num) : this.displayValue + num;
    }
  }

  decimal(): void {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  clear(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.secondOperand = null;
    this.currentOperator = null;
    this.waitingForSecondOperand = false;
  }

  toggleSign(): void {
    this.displayValue = String(parseFloat(this.displayValue) * -1);
  }

  percent(): void {
    this.displayValue = String(parseFloat(this.displayValue) / 100);
  }

  operator(op: TypeEnum): void {
    if (this.firstOperand === null && op !== TypeEnum.SQUARE_ROOT) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.currentOperator || op === TypeEnum.SQUARE_ROOT) {
      this.secondOperand = parseFloat(this.displayValue);
      const record: Record = new Record(
        this.userName,
        this.getOperatorDescription(this.currentOperator ? this.currentOperator : op),
        0,
        this.currentOperator ? this.firstOperand : this.secondOperand,
        this.secondOperand,
        0,
        "",
        new Date()
      );

      this.addRecord(record)
    }

    this.currentOperator = op === TypeEnum.SQUARE_ROOT ? null : op;
    this.waitingForSecondOperand = true;
  }

  calculate(): void {
    if (this.currentOperator && this.firstOperand !== null) {
      this.secondOperand = parseFloat(this.displayValue);
      const record = this.createRecord(this.currentOperator);
      this.addRecord(record);
    }
  }

  private createRecord(typeEnum: TypeEnum): Record {
    return new Record(
      this.userName,
      this.getOperatorDescription(typeEnum),
      0,
      this.firstOperand,
      this.secondOperand,
      0,
      "",
      new Date()
    );
  }

  private addRecord(record: Record):void {
    this.recordService.calculateOperation(record).pipe(
      tap(result => {
        this.userInfoService.setBalance(result.userBalance);
        this.firstOperand = null;
        this.currentOperator = null;
        this.waitingForSecondOperand = false;
        this.stringCreated = this.createString ? result.operationResponse : null;
        this.displayValue = this.createString ? '0' : String(result.operationResponse);
        this.createString = false;
      }),
      catchError(error => {
        this.notificationService.showError(error.error.message);
        return of(null);
      })
    ).subscribe();
  }

  randomString(typeEnum: TypeEnum) {
    this.createString = true;
    const record = this.createRecord(typeEnum);
    this.addRecord(record);
  }

  private getOperatorDescription(operator: TypeEnum): Operation {
    switch (operator) {
      case TypeEnum.ADDITION:
        return {'type': 'Addition'} as Operation;
      case TypeEnum.SUBTRACTION:
        return {'type': 'Subtraction'} as Operation;
      case TypeEnum.MULTIPLICATION:
        return {'type': 'Multiplication'} as Operation;
      case TypeEnum.DIVISION:
        return {'type': 'Division'} as Operation;
      case TypeEnum.SQUARE_ROOT:
        return {'type': 'square_root'} as Operation;
      case TypeEnum.RANDOM_STRING:
        return {'type': 'random_string'} as Operation;
    }
  }
}
