require('isomorphic-fetch');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('ISOMORPHIC Given a DELETE tests', () => {
  let gist = {};
  const headers = {
    Authorization: `Token ${process.env.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
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

  before(() => fetch(
    '//api.github.com/gists',
    { method: 'POST', body: JSON.stringify(gistToCreate), headers }
  )
    .then((responseToCreate) => {
      response = responseToCreate;
      return responseToCreate.json();
    })
    .then((gistResponse) => {
      gist = gistResponse;
    }));

  it('Then a gist must be created', () => {
    expect(response.status).to.equal(statusCode.CREATED);
    expect(gist).to.containSubset(gistToCreate);
  });

  it('Then a gist must exist by url', () => fetch(
    gist.url,
    { method: 'GET', headers }
  )
    .then(responseToCreate => responseToCreate.json())
    .then((responseGit) => {
      expect(responseGit).to.exist;
    }));

  describe('And the gist is deleted', () => {
    before(() => fetch(gist.url, { method: 'DELETE', headers })
      .then((responseToCreate) => {
        expect(responseToCreate.status).to.be.equal(statusCode.NO_CONTENT);
      }));

    it('Then a gist must not exist', () => fetch(gist.url, { method: 'GET', headers })
      .then((reason) => {
        expect(reason.status).to.equal(statusCode.NOT_FOUND);
      }));
  });
});
