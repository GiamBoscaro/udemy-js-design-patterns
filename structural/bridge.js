/**
 * You are given an example of an inheritance hierarchy 
 * which results in Cartesian-product duplication. 
 * Please refactor this hierarchy, giving the base class
 * Shape a constructor that takes a renderer, whose expected
 * interface is:
 * class <SomeRenderer> {
 *  get whatToRenderAs() {
 *      // todo
 *  }
 * }
 * There's no need to implement the type above (due to duck typing),
 * but I do want you to implement classes VectorRenderer and
 * RasterRenderer . Each inheritor of the Shape  class should have
 * a constructor that takes a Renderer such that, subsequently,
 * each constructed object's toString() operates correctly, for
 * example:
 * new Triangle(new RasterRenderer()) # returns "Drawing Triangle as pixels"
 */

class Renderer {
    get whatToRenderAs() { }
}

class VectorRenderer extends Renderer {
    get whatToRenderAs() {
        return 'lines'
    }
}

class RasterRenderer extends Renderer {
    get whatToRenderAs() {
        return 'pixels';
    }
}

class Shape {
    constructor(name = null, renderer) {
        this.name = name;
        this.renderer = renderer;
    }

    toString() {
        return `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`;
    }
}

class Triangle extends Shape {
    constructor(renderer) {
        super('triangle', renderer);
    }
}

class Square extends Shape {
    constructor(renderer) {
        super('square', renderer);
    }
}
