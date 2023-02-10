/**
 * You are given a class called Sentence , which takes a string such as 'hello world'.
 * You need to provide a method at(index) such that the method returns a flyweight that
 * can be used to capitalize a particular word in the sentence.
 * Typical use would be something like:
 * 
 * let s = new Sentence('alpha beta gamma');
 * s.at(1).capitalize = true;
 * console.log(s.toString()); // alpha BETA gamma
 * 
 */
class Sentence {
    constructor(plainText) {
        this.plainText = plainText;
        this.capitalWords = {};
    }

    at(index) {
        this.capitalWords[index] = { capitalize: false };
        return this.capitalWords[index];
    }

    toString() {
        const s = this.plainText.split(" ");
        for (let i = 0; i < s.length; i++) {
            if ((this.capitalWords[i] || {}).capitalize)
                s[i] = s[i].toUpperCase();
        }
        return s.join(" ");
    }
}