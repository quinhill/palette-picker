let Color = require('./Color');
let Palette = require('./Palette');

generatePalette()

$('.generate-button').on('click', generatePalette)

function generatePalette() {
  getColor1(randomColor())
  getColor2(randomColor())
  getColor3(randomColor())
  getColor4(randomColor())
  getColor5(randomColor())
}

function getColor1(color) {
  $('#color-one').css("backgroundColor", color)
  $('#color-name-one').text(`${color}`)
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

