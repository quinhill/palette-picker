
$('.generate-button').on('click', generatePalette)

function randomColor() {
  return  '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
}

function generatePalette() {
  $('#color-one').css("backgroundColor") = "red"
}