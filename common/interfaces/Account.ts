import {Transaction} from "./Transaction";
import {TransactionOrigin} from "../enums/TransactionOrigin";

export interface Account {
    currentDate: Date;
    balance: number;
    accountHistory: Transaction[];
    accountHolderBirthDate?: Date;

    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin): Transaction;

    depositMoney(amount: number,
                 description: string): Transaction;

    advanceDate(numberOfDays: number);
}