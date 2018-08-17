
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.string('color_1');
      table.string('color_2');
      table.string('color_3');
      table.string('color_4');
      table.string('color_5');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropColumn('color_1');
      table.dropColumn('color_2');
      table.dropColumn('color_3');
      table.dropColumn('color_4');
      table.dropColumn('color_5');
    })
  ])
};
