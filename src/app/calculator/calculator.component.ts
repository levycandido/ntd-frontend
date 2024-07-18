import {Component, OnInit} from '@angular/core';
import {TypeEnum} from '../models/TypeEnum';
import {Record} from '../models/record';
import {RecordService} from "../services/RecordService";
import {UserInfoService} from "../services/UserNameService";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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

  TypeEnum = TypeEnum;
  isLoggedIn: boolean;


  constructor(private recordService: RecordService,
              private userInfoService: UserInfoService,
              private authService: AuthService,
              private router: Router) {}

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
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.currentOperator) {
      this.secondOperand = parseFloat(this.displayValue);
      const record: Record = new Record(
        this.userName,
        this.getOperatorDescription(this.currentOperator),
        0,
        this.firstOperand,
        this.secondOperand,
        0,
        0,
        new Date()
      );

      this.recordService.calculateOperation(record)
        .subscribe(result => {
          this.firstOperand = result.operationResponse;
          this.displayValue = String(this.firstOperand);
          this.userInfoService.setBalance(result.userBalance);
        });
    }

    this.currentOperator = op;
    this.waitingForSecondOperand = true;
  }

  calculate(): void {
    if (this.currentOperator && this.firstOperand !== null) {
      this.secondOperand = parseFloat(this.displayValue);
      const record: Record = new Record(
        this.userName,
        this.getOperatorDescription(this.currentOperator),
        0,
        this.firstOperand,
        this.secondOperand,
        0,
        0,
        new Date()
      );

      this.recordService.calculateOperation(record)
        .subscribe(result => {
          this.userInfoService.setBalance(result.userBalance);
          this.displayValue = String(result.operationResponse);
          this.firstOperand = null;
          this.currentOperator = null;
          this.waitingForSecondOperand = false;
        });
    }
  }

  private getOperatorDescription(operator: TypeEnum): string {
    switch (operator) {
      case TypeEnum.ADDITION:
        return 'Addition';
      case TypeEnum.SUBTRACTION:
        return 'Subtraction';
      case TypeEnum.MULTIPLICATION:
        return 'Multiplication';
      case TypeEnum.DIVISION:
        return 'Division';
      case TypeEnum.SQUARE_ROOT:
        return 'Square Root';
      case TypeEnum.RANDOM_STRING:
        return 'Random String';
      default:
        return 'Unknown';
    }
  }
}
