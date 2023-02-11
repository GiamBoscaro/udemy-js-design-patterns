/**
 * You are given a game scenario with classes Goblin and GoblinKing.
 * Please implement the following rules:
 *
 * A goblin has base 1 attack/1 defense (1/1), a goblin king is 3/3.
 * When the Goblin King is in play, every other goblin gets +1 Attack.
 * Goblins get +1 to Defense for every other Goblin in play (a GoblinKing is a Goblin!).
 * Example:
 * Suppose you have 3 ordinary goblins in play. Each one is a 
 * 1/3 (1/1 + 0/2 defense bonus).
 * A goblin king comes into play. Now every goblin is a 2/4 
 * (1/1 + 0/3 defense bonus from each other + 1/0 from goblin king)
 * The state of all the goblins has to be consistent as goblins 
 * are added and removed from the game.
 * Here is an example of the kind of test that will be run on the 
 * system:
 * 
 * let game = new Game();
 * let goblin = new Goblin(game);
 * expect(goblin.attack).toEqual(1);
 * expect(goblin.defense).toEqual(1);
 * 
 * Note: creature removal (unsubscription) does not need to be implemented.
 */

const WhatToQuery = Object.freeze({
    'attack': 1,
    'defense': 2
});

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


class Query {
    constructor(whatToQuery, value) {
        this.whatToQuery = whatToQuery;
        this.value = value;
    }
}

class Goblin {
    constructor(game, baseAttack = 1, baseDefense = 1) {
        this._baseAttack = baseAttack;
        this._baseDefense = baseDefense;
        this.attack = baseAttack;
        this.defense = baseDefense;
        this.game = game;

        // When a goblin spawns, increase defense +1 to any other goblin
        this.game.performQuery('goblin', new Query(WhatToQuery.defense, 1));
        this.token = game.queries.subscribe(
            this.handle.bind(this)
        );
    }

    handle(sender, query) {
        if (query.whatToQuery === WhatToQuery.defense)
            this.defense += query.value;
        if (query.whatToQuery === WhatToQuery.attack)
            this.attack += query.value;
    }
}

class GoblinKing extends Goblin {
    constructor(game) {
        super(game);
        // When a king spawns, increase attack +1 to any other goblin
        this.game.performQuery('king', new Query(WhatToQuery.attack, 1));
    }
}

class Game {
    constructor() {
        this.queries = new Event();
    }

    performQuery(sender, query) {
        this.queries.fire(sender, query);
    }
}