process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('GET /api/v1/projects', () => {

  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  it('should return all projects', done => {
    chai.request(server)
      .get('/api/v1/projects')
      .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(1);
      res.body[0].should.have.property('name');
      res.body[0].name.should.equal('Cool project');
      res.body[0].should.have.property('id');
      res.body[0].id.should.equal(1);
    });
    done();
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, res) => {
        res.should.have.status(404)
      })
      done()
  })
});

describe('GET /api/v1/palettes', () => {

  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  it('should return all palettes', done => {
    chai.request(server)
      .get('/api/v1/palettes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(2);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Beanio');
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('color_1');
        res.body[0].color_1.should.equal('#ffffff');
        res.body[0].should.have.property('color_2');
        res.body[0].color_2.should.equal('#111111');
        res.body[0].should.have.property('color_3');
        res.body[0].color_3.should.equal('#222222');
        res.body[0].should.have.property('color_4');
        res.body[0].color_4.should.equal('#333333');
        res.body[0].should.have.property('color_5');
        res.body[0].color_5.should.equal('#444444');
        res.body[0].should.have.property('project_id');
        res.body[0].project_id.should.equal(1);
        res.body[1].should.have.property('name');
        res.body[1].name.should.equal('Newadoo');
        res.body[1].should.have.property('id');
        res.body[1].id.should.equal(2);
        res.body[1].should.have.property('color_1');
        res.body[1].color_1.should.equal('#0f223a');
        res.body[1].should.have.property('color_2');
        res.body[1].color_2.should.equal('#eeeeee');
        res.body[1].should.have.property('color_3');
        res.body[1].color_3.should.equal('#777777');
        res.body[1].should.have.property('color_4');
        res.body[1].color_4.should.equal('#000000');
        res.body[1].should.have.property('color_5');
        res.body[1].color_5.should.equal('#ffffff');
        res.body[1].should.have.property('project_id');
        res.body[1].project_id.should.equal(1);
      })
      done()
  })
})

describe('POST /api/v1/projects', () => {

  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  it('should add a project', done => {
    chai.request(server)
      .post('/api/v1/projects')
      .send({
        name: 'sweet project',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.id.should.equal(2);
      })
      done()
  })

  it('should not create a record with missing data', done => {
    chai.request(server)
    .post('/api/v1/projects')
    .send({  })
    .end((err, response) => {
      response.should.have.status(422);
      response.body.error.should.equal('Expected format: { name: <String>}. You\'re missing a "name" property.');
      done();
    });
  });
})

describe('POST /api/v1/palettes', () => {

  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  it('should add a palette', done => {
    chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'sweet palette',
        project_id: 1,
        color_1: '#111111',
        color_2: '#222222',
        color_3: '#111111',
        color_4: '#222222',
        color_5: '#111111',
        color_6: '#222222'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.id.should.equal(2);
      })
      done()
  })
})