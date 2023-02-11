/**
 * You are asked to write an expression processor for simple 
 * numeric expressions with the following constraints:
 * Expressions use integral values (e.g., '13' ), single-letter
 * variables defined in Variables, as well as + and - operators only
 * There is no need to support braces or any other operations
 * If a variable is not found in variables  (or if we encounter 
 * a variable with >1 letter, e.g. ab), the evaluator returns 0 (zero)
 * In case of any parsing failure, evaluator returns 0
 * Example:
 * calculate("1+2+3")  should return 6
 * calculate("1+2+xy")  should return 0
 * calculate("10-2-x")  when x=3 is in variables  should return 5
 */

class ExpressionProcessor {
    constructor() {
        this.variables = {};
        this.nextOp = Object.freeze({
            nothing: 0,
            plus: 1,
            minus: 2
        });
    }

    calculate(expression) {
        let current = 0;
        let nextOp = this.nextOp.nothing;

        let parts = expression.split(/(?<=[+-])/);

        for (let part of parts) {
            let noop = part.split("+-");
            let first = noop[0];
            let value = 0, z = 0;

            z = parseInt(first);
            if (!isNaN(z))
                value = z;
            else if (first.length === 1
                && this.variables[first[0]] !== undefined) {
                value = this.variables[first[0]];
            }
            else return 0;

            switch (nextOp) {
                case this.nextOp.nothing:
                    current = value;
                    break;
                case this.nextOp.plus:
                    current += value;
                    break;
                case this.nextOp.minus:
                    current -= value;
                    break;
            }

            if (part.endsWith('+')) nextOp = this.nextOp.plus;
            else if (part.endsWith('-')) nextOp = this.nextOp.minus;
        }
        return current;
    }
}