$('.generate-button').on('click', generatePalette);
$('#1').on('click', handleLockColor);
$('#2').on('click', handleLockColor);
$('#3').on('click', handleLockColor);
$('#4').on('click', handleLockColor);
$('#5').on('click', handleLockColor);
$('#name-project-form').on('submit', getProjectName);
$('#name-palette-form').on('submit', getPaletteName);
$('.saved-palettes-container').on('click', '.delete-palette', deletePalette);
$('.saved-palettes-container').on('click', '.saved-palette', showPalette);

const projectsUrl = '/api/v1/projects';
const palettesUrl = '/api/v1/palettes';

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
  
  unlockAll() {
    this.colors.forEach(color => {
      color.locked = false
    })
  }

  assignClicked(displayColors) {
    this.colors.forEach((colorNum, index) => {
      colorNum.color = displayColors[index]
    })
  }
}

let palette = new Palette();

generatePalette();

checkProjects();

getProjects()

async function checkProjects() {
  $('.saved-palettes-container').empty();
  const response = await fetch(projectsUrl);
  const projects = await response.json();
  projects.forEach(project => {
    $('.saved-palettes-container').append(`
      <div class="project-container">
      <h3 class="project-title" id="project${project.id}">
        ${project.name}
      </h3>
      </div>
      `)
    appendPalettes(project.id)
  })
}

async function appendPalettes(id) {
  const response = await fetch(palettesUrl)
  const palettes = await response.json()
  palettes.forEach((palette) => {
    if (palette.project_id === id) {
      $(`#project${id}`).append(`
        <div id="palette${palette.id}>
          <h5 class="palette-title">${palette.name}</h5>
          <div class="saved-palette" id="${palette.id}">
            <div class="saved-color" style="background-color:${palette.color_1};"></div>
            <div class="saved-color" style="background-color:${palette.color_2};"></div>
            <div class="saved-color" style="background-color:${palette.color_3};"></div>
            <div class="saved-color" style="background-color:${palette.color_4};"></div>
            <div class="saved-color" style="background-color:${palette.color_5};"></div>
          </div>
          <button class="delete-palette" id="${palette.id}">
            trash
          </button>
        </div>
        `)
    }
  })
}

async function showPalette(event) {
  const id = $(event.target).parent().attr('id');
  const response = await fetch(`/api/v1/palettes/${id}`);
  const result = await response.json()
  const currPalette = result[0]
  const paletteKeys = Object.keys(currPalette)
  const colorKeys = paletteKeys.filter(color => {
    return color.split('_')[0] === 'color'
  })
  const colors = colorKeys.map(color => currPalette[color])
  palette.assignClicked(colors);
  assignColors();
  resetLocks();
}

async function deletePalette(event) {
  $(event.target).closest('div').remove();
  const id = event.target.id;
  const url = `/api/v1/palettes/${id}`
  await fetch(url, {method: "DELETE"})
}

function generatePalette() {
  palette.generateColors()
  assignColors()
}


function getProjects() {
  fetch(projectsUrl)
    .then(response => response.json())
    .then(data => populateSelect(data))
}

function populateSelect(projects) {
  projects.forEach(project => {
    $('#project-select').append(`<option value="${project.name}">${project.name}</option>`)
  })
}

function assignColors(colorsArray) {
  const colors = colorsArray || palette.colors;
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
  fetch(projectsUrl,
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

async function getPaletteName(event) {
  event.preventDefault();
  const projectName = $('#project-select option:selected').val();
  const paletteName = $('.palette-name-input').val();
  const projectId = await fetchProjectId(projectName)
  postPalette(paletteName, projectId)
  resetLocks()
}

function resetLocks() {
  $('.color-lock').each(function() {
    $(this).removeClass('locked')
  })
  palette.unlockAll()
}

async function fetchProjectId(projectName) {
  const response = await fetch(projectsUrl);
  const result = await response.json();
  const project = result.find(project => project.name === projectName);
  return project.id;
}


function postPalette(paletteName, projectId) {
  const colors = palette.colors.map((colorNum, i) => {
    const colorName = `color_${i + 1}`;
    return {[colorName]: colorNum.color}
  })
  let bodyObj = {name: paletteName, project_id: projectId}
  colors.forEach(color => {
    bodyObj = {...bodyObj, ...color}
  })
  const options = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj)
  };
  fetch(palettesUrl, options)
    .then(response => response);
  checkProjects()
}