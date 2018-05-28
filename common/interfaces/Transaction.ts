import {TransactionOrigin} from "../enums/TransactionOrigin";

export interface Transaction {
    success: boolean;
    amount: number; // amount will be positive for deposits and negative for withdrawals
    resultBalance: number; // resultBalance will be unchanged from the previous balance when success is false
    transactionDate: Date;
    description: string;
    errorMessage: string; // errorMessage will be an empty string when success is true
    transactionOrigin?: TransactionOrigin;
}