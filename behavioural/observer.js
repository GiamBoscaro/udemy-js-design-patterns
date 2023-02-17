/**
 * Imagine a game where one or more rats can attack a player. Each individual rat
 * has an initial attack value of 1. However, rats attack as a swarm, so each rat's
 * attack value is actually equal to the total number of rats in play.
 * Given that a rat enters play through the initializer and leaves play (dies) via
 * its die() method, please implement the Game and Rat classes so that, at any point
 * in the game, the attack value of a rat is always consistent.
 * Here's a sample unit test your code should pass:
 * 
 * let game = new Game();
 * let rat = new Rat(game);
 * let rat2 = new Rat(game);
 * expect(rat.attack).toEqual(2);
 * expect(rat2.attack).toEqual(2);
 * 
 */

class Event {
    constructor() {
        this.handlers = new Map();
        this.count = 0;
    }

    subscribe(handler) {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(idx) {
        this.handlers.delete(idx);
    }

    fire(sender, args) {
        this.handlers.forEach(function (v, k) {
            v(sender, args);
        });
    }
}

class Game {
    constructor() {
        this.ratEnters = new Event();
        this.ratDies = new Event();
        this.ratCount = 0;
    }

    fireRatEnters(sender) {
        this.ratEnters.fire(sender, { attack: ++this.ratCount });
    }

    fireRatDies(sender) {
        this.ratDies.fire(sender, { attack: --this.ratCount });
    }
}

class Rat {
    constructor(game) {
        this.game = game;
        this.attack = 1;
        game.ratEnters.subscribe(
            this.attackChanged.bind(this)
        );
        game.ratDies.subscribe(
            this.attackChanged.bind(this)
        );
        game.fireRatEnters(this);
    }

    attackChanged(sender, args) {
        this.attack = args.attack;
    }

    die() {
        this.game.fireRatDies(this);
    }
}