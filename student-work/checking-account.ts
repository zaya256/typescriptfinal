import { PersonalAccount } from "./personal-account";
import { Transaction } from '../common/interfaces/Transaction';

export class CheckingAccount extends PersonalAccount {
  currentDate: Date;
  balance: number;
  accountHistory: Transaction[];

  constructor(currentDate: Date) {
    super(currentDate);
    this.balance = 1000;
  }

  advanceDate(days) {
    super.computeInterest(days, .01);
  }
}
