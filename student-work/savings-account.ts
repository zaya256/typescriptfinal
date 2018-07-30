import { PersonalAccount } from "./personal-account";
import { Transaction } from "../common/interfaces/Transaction";
import { TransactionOrigin } from "../common/enums/TransactionOrigin";

export class SavingsAccount extends PersonalAccount {

  withdrawals: number = 0;
  maxWithdrawals: number = 6;

  constructor(currentDate) {
    super(currentDate);
    this.balance = 10000;
    this.interestRate = 0.02;
  }

  advanceDate(days: number) {
    let currentMonth = this.currentDate.getMonth();
    super.computeInterest(days, 0.02);
    if (currentMonth !== this.currentDate.getMonth()) {
      this.withdrawals = 0;
    }
  }

  withdrawMoney(amount: number,
    description: string,
    transactionOrigin: TransactionOrigin): Transaction {

    if (transactionOrigin === TransactionOrigin.WEB || transactionOrigin === TransactionOrigin.PHONE) {
      this.withdrawals = this.withdrawals + 1;
    }

    if (this.withdrawals <= this.maxWithdrawals) {
      return super.withdrawMoney(amount, description, transactionOrigin);
    }

    else {

      return {
        success: false,
        amount: -amount,
        resultBalance: this.balance,
        transactionDate: this.currentDate,
        description: description,
        errorMessage: "Maximum withdrawals exceeded",
        transactionOrigin: transactionOrigin
      }
    }
  }
}
