class Field
{
  constructor(name)
  {
    this.name = name;
  }
}

class Class
{
  constructor(name)
  {
    this.name = name;
    this.fields = [];
  }

  toString()
  {
    let buffer = [];
    buffer.push(`class ${this.name} {\n`);

    if (this.fields.length > 0) {
      buffer.push(`  constructor(`);
      buffer.push(this.fields.map(f => f.name).join(', '));
      buffer.push(`) {\n`);
      buffer.push(this.fields.map(f => `    this.${f.name} = ${f.name};`).join('\n'));
      buffer.push('\n  }\n');
    }

    buffer.push('}');
    return buffer.join('');
  }
}

class CodeBuilder
{
  constructor(className)
  {
    this._class = new Class(className);
  }

  addField(name)
  {
    this._class.fields.push(
      new Field(name)
    );
    return this;
  }

  toString()
  {
    return this._class.toString();
  }
}