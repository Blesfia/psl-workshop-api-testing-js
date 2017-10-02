const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('Given a DELETE tests', () => {
  let gist = {};
  const gistToCreate = {
    description: 'the description for this gist',
    files: {
      'file1.txt': {
        content: 'Ej: new Promise((resolve) => {\n' +
                '  setTimeout(() => resolve(true), 1000);\n' +
                '});'
      }
    },
    public: false
  };
  let response = {};

  before(() => agent.post('https://api.github.com/gists', gistToCreate)
    .auth('token', process.env.ACCESS_TOKEN).then((responseToCreate) => {
      gist = responseToCreate.body;
      response = responseToCreate;
    }));

  it('Then a gist must be created', () => {
    expect(response.status).to.equal(statusCode.CREATED);
    expect(gist).to.containSubset(gistToCreate);
  });

  it('Then a gist must exist by url', () => agent.get(gist.url)
    .auth('token', process.env.ACCESS_TOKEN).then((responseGit) => {
      gist = responseGit.body;
      expect(gist).to.exist;
    }));
  describe('And the gist is deleted', () => {
    before(() => agent.del(gist.url).auth('token', process.env.ACCESS_TOKEN).then((responseGit) => {
      expect(responseGit.status).to.be.equal(statusCode.NO_CONTENT);
    }));
    it('Then a gist must not exist', () => agent.get(gist.url)
      .auth('token', process.env.ACCESS_TOKEN).catch((reason) => {
        expect(reason.status).to.equal(statusCode.NOT_FOUND);
      }));
  });
});
