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
$('#name-project-form').on('submit', getProjectName);
$('#name-palette-form').on('submit', getPaletteName)

function generatePalette() {
  palette.generateColors()
  assignColors()
}

getProjects()

function getProjects() {
  fetch('http://localhost:3000/api/v1/projects')
    .then(response => response.json())
    .then(data => populateSelect(data))
}

function populateSelect(projects) {
  projects.forEach(project => {
    $('#project-select').append(`<option value="${project.name}">${project.name}</option>`)
  })
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

function getProjectName(event) {
  event.preventDefault();
  const projectName = $('.project-name-input').val();
  $('#project-select').append(`<option value="${projectName}">${projectName}</option>`);
  const project = { name: projectName };
  postProject(project);
}

function postProject(project) {
  const url = 'http://localhost:3000/api/v1/projects';
  fetch(url,
    {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .catch(error => console.log(error.message))
}

function getPaletteName(event) {
  event.preventDefault();
  const projectName = $('#project-select option:selected').val();
  
  const paletteName = $('.palette-name-input').val();
  createOptionsObj(paletteName);
}

function createOptionsObj(name) {

}