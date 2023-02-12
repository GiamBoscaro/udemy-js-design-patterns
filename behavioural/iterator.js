/**
 * Given the following definition of a Node, please implement preorder
 * traversal right inside Node. The sequence returned should be the
 * sequence of values, not their containing nodes.
 */

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    * preorder() {
        function* trasverse(current) {
            yield current.value;
            if (current.left) {
                for (let l of trasverse(current.left))
                    yield l;
            }
            if (current.right) {
                for (let r of trasverse(current.right))
                    yield r;
            }
        }
        for (let n of trasverse(this))
            yield n;
    }
}