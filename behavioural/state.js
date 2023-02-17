/**
 * A combination lock is a lock that opens after the right digits have been entered.
 * A lock is preprogrammed with a combination (e.g., 12345 ) and the user is expected
 * to enter this combination to unlock the lock.
 * The lock has a Status field that indicates the state of the lock. The rules are:
 * 
 * If the lock has just been locked (or at startup), the status is LOCKED.
 * If a digit has been entered, that digit is shown on the screen. As the user enters more digits,
 * they are added to Status.
 * If the user has entered the correct sequence of digits, the lock status changes to OPEN.
 * If the user enters an incorrect sequence of digits, the lock status changes to ERROR.
 * Please implement the CombinationLock  class to enable this behavior. Be sure to test both
 * correct and incorrect inputs.
 * Here is an example unit test for the lock:
 * 
 * let cl = new CombinationLock([1, 2, 3, 4, 5]);
 * expect(cl.status).toEqual('LOCKED');
 * cl.enterDigit(1);
 * expect(cl.status).toEqual('1');
 * cl.enterDigit(2);
 * expect(cl.status).toEqual('12');
 * cl.enterDigit(3);
 * expect(cl.status).toEqual('123');
 * cl.enterDigit(4);
 * expect(cl.status).toEqual('1234');
 * cl.enterDigit(5);
 * expect(cl.status).toEqual('OPEN');
 */

class CombinationLock {
    constructor(combination) {
        this.combination = combination;
        this.initRules();
        this.reset();
    }

    initRules() {
        this.rules = {};
        this.rules['LOCKED'] = [
            { trigger: this.combination[0], state: this.combination[0].toString() },
        ];

        for (let i = 1; i < this.combination.length - 1; i++) {
            this.rules[this.combination.join("").substring(0, i)] = [
                { trigger: this.combination[i], state: this.combination.join("").substring(0, i + 1) },
            ];
        }

        this.rules[this.combination.join("").substring(0, this.combination.length - 1)] = [
            { trigger: this.combination[this.combination.length - 1], state: "OPEN" },
        ];

    }

    reset() {
        this.status = 'LOCKED';
    }

    enterDigit(digit) {
        let rule = this.rules[this.status][0];


        if (rule.trigger !== digit) { this.status = 'ERROR'; }
        else this.status = rule.state;
    }

}