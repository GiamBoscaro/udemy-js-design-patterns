/**
 * Given the definitions shown in code, 
 * you are asked to implement Line.deepCopy()
 * to perform a deep copy of the given Line  object.
 * This method should return a copy of a Line that
 * contains copies of its start/end points.
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    return new Line(
      new Point(this.start.x, this.start.y),
      new Point(this.end.x, this.end.y),
    );
  }
}