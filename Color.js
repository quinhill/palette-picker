class Color {
  constructor() {
    this.color = this.randomColor();
    this.locked = false;
  }

  randomColor = () => (
    '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  );

module.exports = Color;