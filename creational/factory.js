class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class PersonFactory {
    constructor() {
        this.id = 0;
    }
    createPerson(name) {
        return new Person(this.id++, name);
    }
}