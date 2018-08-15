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
  assignColors()
}

function assignColors() {
  const colors = palette.colors;
  $('.color-container').each(function(index) {
    $(this).css("backgroundColor", colors[index].color)
  })
  $('.color-tag').each(function (index) {
    $(this).text(colors[index].color)
  })
}


function handleLockColor(event) {
  const id = event.target.id;
  toggleLockedClass(id)
  palette.lockColor(id);
}

function toggleLockedClass(id) {
  if ($(`#${id}`).hasClass('locked')) {
    $(`#${id}`).removeClass('locked')
  } else {
    $(`#${id}`).addClass('locked')
  }
}

