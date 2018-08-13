
$('.generate-button').on('click', generatePalette)

function randomColor() {
  return  '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
}

function generatePalette() {
  getColor1(randomColor())
  getColor2(randomColor())
  getColor3(randomColor())
  getColor4(randomColor())
  getColor5(randomColor())
}

function getColor1(color) {
  $('#color-one').css("backgroundColor", color)
  
}

function getColor2(color) {
  $('#color-two').css("backgroundColor", color)
}

function getColor3(color) {
  $('#color-three').css("backgroundColor", color)
}

function getColor4(color) {
  $('#color-four').css("backgroundColor", color)
}

function getColor5(color) {
  $('#color-five').css("backgroundColor", color)
}