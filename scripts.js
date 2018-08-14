import Color from './Color';
import Palette from './Palette';

generatePalette()

$('.generate-button').on('click', generatePalette)

function generatePalette() {
  Palette = new Palette();
  console.log(Palette);
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

