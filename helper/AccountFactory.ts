import {Account} from "../common/interfaces/Account";
import { CheckingAccount } from "../student-work/checking-account";
import { SavingsAccount } from "../student-work/savings-account";
import { RetirementAccount } from "../student-work/retirement-account";

export class AccountFactory {

    static getCheckingAccountObject(currentDate: Date): Account {
        return new CheckingAccount(currentDate);
    }

    static getSavingsAccountObject(currentDate: Date): Account {
        return new SavingsAccount(currentDate);
    }

    static getRetirementAccountObject(currentDate: Date, accountHolderBirthDate: Date): Account {
        return new RetirementAccount(currentDate, accountHolderBirthDate);
    }

}
