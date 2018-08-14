class Color {
  constructor() {
    this.color = this.randomColor();
    this.locked = null;
  }

  randomColor = () => (
    '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  );
}

export default Color;