class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Line
{
  constructor(start, end)
  {
    this.start = start;
    this.end = end;
  }

  deepCopy()
  {
      return new Line(
        new Point(this.start.x, this.start.y),
        new Point(this.end.x, this.end.y),
      );
  }
}