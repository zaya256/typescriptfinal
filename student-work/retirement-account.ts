import { PersonalAccount } from "./personal-account";
import { TransactionOrigin } from "../common/enums/TransactionOrigin";
import { Transaction } from "../common/interfaces/Transaction";

export class RetirementAccount extends PersonalAccount {

  age = new Date(1970, 0, 0);

  constructor(currentDate, birthday) {
    super(currentDate);
    this.accountHolderBirthDate = birthday;
    this.balance = 100000;
  }

  advanceDate(days) {
    super.computeInterest(days, 0.03);
  }

  withdrawMoney(amount: number,
    description: string,
    transactionOrigin: TransactionOrigin): Transaction {

    if (this.age <= this.accountHolderBirthDate) {
      amount = amount * 1.1;
    }

    return super.withdrawMoney(amount, description, transactionOrigin);
  }
}
