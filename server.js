const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('api/v1/palette/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palette => {
      if (palette.length) {
        response.status(200).json(palette);
      } else {
        response.status(404).json({
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of 'name') {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>}. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('palettes').insert(paper, 'id')
    .then(paper => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/projects', (request, response) => {
  response.send('oh hey Palette Picker');
});

app.get('/project/:id', (request, response) => {
  response.send('oh hey Palette Picker');
});


app.post('/projects', (request, response) => {
  response.send('oh hey Palette Picker');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});