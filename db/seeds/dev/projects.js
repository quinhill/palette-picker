
exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Cool project'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { 
              name: 'Beanio', 
              project_id: project[0],
              color_1: '#ffffff',
              color_2: '#111111',
              color_3: '#222222',
              color_4: '#333333',
              color_5: '#444444',
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
