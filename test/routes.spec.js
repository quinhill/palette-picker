process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/v1/projects', () => {
  it('should return all projects', done => {
    chai.request(server)
    .get('/api/v1/projects')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
    res.body.length.should.equal(1);
    res.body[0].should.have.property('name');
    res.body[0].name.should.equal('Cool project');
    res.body[0].should.have.property('id');
    res.body[0].id.should.equal(2);
    done();
    });
  });
});