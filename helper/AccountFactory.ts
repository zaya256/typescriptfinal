import {Account} from "../common/interfaces/Account";
import { CheckingAccount } from "../student-work/checking-account";

export class AccountFactory {

    static getCheckingAccountObject(currentDate: Date): Account {
        return new CheckingAccount(currentDate);
    }

    static getSavingsAccountObject(currentDate: Date): Account {
        throw new Error("You need to implement this :)");
    }

    static getRetirementAccountObject(currentDate: Date, accountHolderBirthDate: Date): Account {
        throw new Error("You need to implement this :)");
    }

}