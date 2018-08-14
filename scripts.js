class Palette {
  constructor() {
    this.colors = [
      { color: null, locked: false },
      { color: null, locked: false },
      { color: null, locked: false },
      { color: null, locked: false },
      { color: null, locked: false }
    ]
  }
  
  randomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  }

  generateColors() {
    this.colors.forEach(colorNum => {
      if(!colorNum.locked) {
        colorNum.color = this.randomColor()
      }
    })
  }

  lockColor(id) {
    this.colors[id].locked = !this.colors[id].locked;
  }
}

let palette = new Palette();

generatePalette()

$('.generate-button').on('click', generatePalette);
$('#1').on('click', handleLockColor);
$('#2').on('click', handleLockColor);
$('#3').on('click', handleLockColor);
$('#4').on('click', handleLockColor);
$('#5').on('click', handleLockColor);

function generatePalette() {
  palette.generateColors()
  console.log(palette)
}

function getColors(color) {
  $('.color-container').forEach(color => {
    
  })
}

function getColor2(color) {
  $('#color-two').css("backgroundColor", color)
  $('#color-name-two').text(`${color}`)
}

function getColor3(color) {
  $('#color-three').css("backgroundColor", color)
  $('#color-name-three').text(`${color}`)
}

function getColor4(color) {
  $('#color-four').css("backgroundColor", color)
  $('#color-name-four').text(`${color}`)
}

function getColor5(color) {
  $('#color-five').css("backgroundColor", color)
  $('#color-name-five').text(`${color}`)
}

function handleLockColor(event) {
  const id = event.target.id;
  palette.lockColor(id);
  console.log(palette)
}