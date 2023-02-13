/**
 * Our system has any number of instances of Participant 
 * classes. Each Participant has a value integer attribute,
 * initially zero.
 * A participant can say()  a particular value, which is
 * broadcast to all other participants. At this point in
 * time, every other participant is obliged to increase
 * their value  by the value being broadcast.
 * Example:
 * 
 * Two participants start with values 0 and 0 respectively
 * Participant 1 broadcasts the value 3. We now have 
 * Participant 1 value = 0, Participant 2 value = 3
 * Participant 2 broadcasts the value 2. We now have
 * Participant 1 value = 2, Participant 2 value = 3
 */

class Mediator {
    constructor() {
        this.participants = [];
    }

    add(participant) {
        this.participants.push(participant);
    }

    inc(sender, n) {
        for (let p of this.participants) {
            if (p !== sender)
                p.value += n;
        }
    }

}

class Participant {
    constructor(mediator) {
        this.value = 0;
        this.mediator = mediator;
        this.mediator.add(this);
    }

    say(n) {
        this.mediator.inc(this, n);
    }
}