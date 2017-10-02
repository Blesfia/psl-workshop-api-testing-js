const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('Given a DELETE tests', () => {
  let gist = {};
  it('Then a gist must be created', () => agent.post('https://api.github.com/gists', {
    description: 'the description for this gist',
    files: {
      'file1.txt': { content: 'Ej: new Promise<any>();' }
    }
  }).auth('token', process.env.ACCESS_TOKEN).then((response) => {
    gist = response.body;
    expect(response.status).to.equal(statusCode.CREATED);
    expect(gist).to.containSubset({
      description: 'the description for this gist',
      public: false,
      files: {
        'file1.txt': { content: 'Ej: new Promise<any>();' }
      }
    });
  }));

  it('Then a gist must exist by url', () => agent.get(gist.url).auth('token', process.env.ACCESS_TOKEN).then((response) => {
    gist = response.body;
    expect(gist).to.exist;
  }));
  describe('And the gist is deleted', () => {
    before(() => agent.del(gist.url).auth('token', process.env.ACCESS_TOKEN).then((response) => {
      expect(response.status).to.be.equal(statusCode.NO_CONTENT);
    }));
    it('Then a gist must not exist', () => agent.get(gist.url).auth('token', process.env.ACCESS_TOKEN).catch((reason) => {
      expect(reason.status).to.equal(statusCode.NOT_FOUND);
    }));
  });
});
