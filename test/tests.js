const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const migrations = require('../migrations/20180815080623_initial')
const up = migrations.up;
const down = migrations.down;
const seeds = require('../seeds/projects');
const seed = seeds.seed();

chai.use(chaiHttp);

before(done => {
  up()
  seed()
  done()
})

beforeEach(done => {

})
