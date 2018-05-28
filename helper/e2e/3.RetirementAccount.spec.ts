import {TransactionOrigin} from "../../common/enums/TransactionOrigin";
import {AccountFactory} from "../AccountFactory";
import {Account} from "../../common/interfaces/Account";

describe("A retirement account", () => {
    it("gets initialized with the correct balance (Retirement Account Requirement #1)", () => {
        let retirement = createRetirementAccount();
        expect(retirement.balance).toBe(100000);
    });
    it("processes deposits correctly (Retirement Account Requirement #2)", () => {
        let retirement = createRetirementAccount();
        let balance = retirement.balance;
        let depositAmt = 1010;
        retirement.depositMoney(depositAmt, "test deposit");
        expect(retirement.balance).toBe(balance + depositAmt);
    });
    it("calculates interest correctly with no deposits in between (Retirement Account Requirement #3)", () => {
        let retirement = createRetirementAccount();
        retirement.advanceDate(365);
        expect(retirement.balance).toBeCloseTo(102784.63);
    });
    it("calculates interest correctly with deposits in between (Retirement Account Requirement #4)", () => {
        let expectedNewBalances = [101252.50, 102508.13, 103766.90, 105028.82, 106293.89, 107562.12, 108833.53, 110108.11, 111385.88, 112666.84, 113951.01, 115238.39];
        let advanceDates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let depositAmt = 1000;

        let retirement = createRetirementAccount();
        for (let i = 0; i < expectedNewBalances.length; i++) {
            let depositAttempt = retirement.depositMoney(depositAmt, `deposit ${i + 1}`);
            expect(depositAttempt.success).toBeTruthy("Unable to deposit money");
            retirement.advanceDate(advanceDates[i]);
            expect(retirement.balance).toBeCloseTo(expectedNewBalances[i], 2, `Account balance mismatch for month: ${i + 1}`);
            expect(retirement.accountHistory.length).toBe((i + 1) * 2);
        }
    });
    it("disallows a withdrawal for more than the current available balance (Retirement Account Requirement #5)", () => {
        let retirement = createRetirementAccount();
        let balance = retirement.balance;
        let overdraftAttempt = retirement.withdrawMoney(balance + 1, "withdrawal test 1", TransactionOrigin.BRANCH);
        expect(overdraftAttempt.success).toBeFalsy("Able to withdraw more than available balance after a withdrawal of $100,001.");
        expect(retirement.balance).toBeCloseTo(balance, 0, "Available balance is not what was expected after a withdrawal attempt of $100,001.");
        let withdrawAttempt = retirement.withdrawMoney(500, "withdrawal test 2", TransactionOrigin.BRANCH);
        expect(retirement.balance).toBeCloseTo(balance - 550, 0, "Available balance is not what was expected after a withdrawal of $500.");
        expect(withdrawAttempt.success).toBeTruthy("Unable to withdraw money when enough balance is available after an overdraft attempt of $500.");
    });
    it("charges a 10% fee on a withdrawal when the account holder is younger than sixty years of age (Retirement Account Requirement #6)", () => {
        let retirement = createRetirementAccount();
        let expectedNewBalance = retirement.balance - 10000 - 10000 * .1;
        let withdrawal = retirement.withdrawMoney(10000, "withdrawal test", TransactionOrigin.BRANCH);
        expect(retirement.balance).toBe(expectedNewBalance, "Retirement account's new balance is not correct.");
        expect(withdrawal.resultBalance).toBe(expectedNewBalance, "Transaction's resulting balance is not correct.");
    });
    it("charges a no fee on a withdrawal when the account holder is sixty years old or older (Retirement Account Requirement #7)", () => {
        let retirement = AccountFactory.getRetirementAccountObject(new Date(2000, 0, 1), new Date(1950, 6, 1));
        let expectedNewBalance = retirement.balance - 10000;
        let withdrawal = retirement.withdrawMoney(10000, "withdrawal test", TransactionOrigin.BRANCH);
        expect(retirement.balance).toBe(expectedNewBalance);
        expect(withdrawal.resultBalance).toBe(expectedNewBalance);
    });
});

function createRetirementAccount(): Account {
    return AccountFactory.getRetirementAccountObject(new Date(2000, 0, 1), new Date(1990, 6, 1));
}
