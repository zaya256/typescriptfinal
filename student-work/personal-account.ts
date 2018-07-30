import { Account } from "../common/interfaces/Account";
import { Transaction } from "../common/interfaces/Transaction";
import { TransactionOrigin } from "../common/enums/TransactionOrigin";

export class PersonalAccount implements Account {

  balance: number;
  accountHistory: Transaction[] = [];
  accountHolderBirthDate: Date;
  interestRate: number;

  constructor(public currentDate: Date) {
    this.currentDate = currentDate;
  }

  computeInterest(days: number, interestRate: number) {

    for (let i = 1; i <= days; i++) {

      this.currentDate.setDate(this.currentDate.getDate() + 1);

      if (this.currentDate.getDate() === 1) {
        let deposit = +((interestRate * this.balance) / 12).toFixed(2);
        this.depositMoney(deposit, "Interest payment");
      }
    }
  }

  advanceDate(days: number) {

    for (let i = 0; i < days; i++) {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      if (this.currentDate.getDate() === 1) {
        let monthlyInterest: number = Number((this.balance * (this.interestRate / 12)));
        this.depositMoney(Number(monthlyInterest.toFixed(2)), "Interest payment");
      }
    }
  }

  depositMoney(amount: number, description: string): Transaction {
    this.balance += amount;

    let deposit = {
      success: true,
      amount: amount,
      resultBalance: this.balance,
      transactionDate: this.currentDate,
      description: description,
      errorMessage: ""
    };
    this.accountHistory.push(deposit);
    return deposit;
  }

  withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {

    let withdraw: Transaction;

    if (amount > this.balance) {
      withdraw = {
        success: false,
        amount: -amount,
        resultBalance: this.balance,
        transactionDate: this.currentDate,
        description: description,
        errorMessage: "You don't have enough money!"
      };

      this.accountHistory.push(withdraw);

      return withdraw;

    } else {

      this.balance -= amount;

      withdraw = {
        success: true,
        amount: -amount,
        resultBalance: this.balance,
        transactionDate: this.currentDate,
        description: description,
        errorMessage: ""

      };

      this.accountHistory.push(withdraw);

      return withdraw;
    }
  }
}
