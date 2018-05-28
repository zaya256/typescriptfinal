import { Account } from '../common/interfaces/Account';
import { Transaction } from '../common/interfaces/Transaction';
import { TransactionOrigin } from '../common/enums/TransactionOrigin';
import * as moment from 'moment';

export class CheckingAccount implements Account {
    currentDate: Date;
    balance: number;
    accountHistory: Transaction[];
    accountHolderBirthDate?: Date;

    constructor(currentDate: Date) {
        this.currentDate = currentDate;
        this.balance = 1000;
        this.accountHistory = [];
    }

    public withdrawMoney(
        amount: number,
        description: string,
        transactionOrigin: TransactionOrigin): Transaction {

        const validTransaction = this.balance >= amount;
        const newTransaction = {
            success: validTransaction,
            amount: amount * -1,
            resultBalance: validTransaction ? this.balance - amount : this.balance,
            transactionDate: new Date(),
            description,
            errorMessage: validTransaction ? 'widthdrawal successfull' : 'widthdrawal failed',
            transactionOrigin
        } as Transaction;

        this.accountHistory.push(newTransaction);

        if (validTransaction) {
            this.balance -= amount;
        }

        return newTransaction;
    }

    public depositMoney(
        amount: number,
        description: string): Transaction {
            const validTransaction = amount > 0;
            const newTransaction = {
                success: validTransaction,
                amount,
                resultBalance: validTransaction ? this.balance + amount : this.balance,
                transactionDate: new Date(),
                description,
                errorMessage: validTransaction ? '' : 'deposit failed'
            } as Transaction;

            this.accountHistory.push(newTransaction);

            if (validTransaction) {
                this.balance += amount;
            }

            return newTransaction;
    }

    public advanceDate(numberOfDays: number) {
        let newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + numberOfDays);

        const d1 = moment(this.currentDate);
        const d2 = moment(newDate);

        const numOfMonths = d2.diff(d1, 'months');
        this.currentDate = newDate;

        if (d2.day() === 1 && numOfMonths === 0) {
            const amount = this.balance * 0.01 / 12;
            this.depositMoney(amount, 'Interest payment');
        }

        for (let i = 0; i < numOfMonths; i++) {
            const amount = this.balance * 0.01 / 12;
            this.depositMoney(amount, 'Interest payment');
        }
    }
}
