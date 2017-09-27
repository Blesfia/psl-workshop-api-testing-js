require('dotenv').config();
const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const https = require('https');
const fs = require('fs');

describe('Given the exercise "Consumiendo Métodos GET"', () => {
  describe('When someone request for the user aperdomob', () => {
    let response = {};
    before('And the data is collected', (done) => {
      agent.get('https://api.github.com/users/aperdomob')
        .then((responseGitHub) => {
          response = responseGitHub.body;
          done();
        });
    });

    it('Then the name must be correct', () => {
      expect(response.name).to.equal('Alejandro Perdomo');
    });
    it('Then the company must be correct', () => {
      expect(response.company).to.equal('PSL');
    });
    it('Then the location must be correct', () => {
      expect(response.location).to.equal('Colombia');
    });
  });

  describe('When someone request for the user aperdomob repos', () => {
    let response = [];
    before('And the data is collected', (done) => {
      agent.get('https://api.github.com/users/aperdomob/repos')
        .then((responseGitHub) => {
          response = responseGitHub.body;
          done();
        });
    });
    describe('And the repo jasmine-awesome-report is needed', () => {
      let repo = null;
      before('And the repo is collected', () => {
        repo = response.find(element => element.name === 'jasmine-awesome-report');
      });
      it('Then the repo jasmine-awesome-report must exist', () => {
        expect(repo).to.not.be.null;
      });
      it('Then the name must be correct', () => {
        expect(repo.name).to.equal('jasmine-awesome-report');
      });
      it('Then the private parameter must must be correct', () => {
        expect(repo.private).to.be.false;
      });
      it('Then the description must must be correct', () => {
        expect(repo.description).to.equal('An awesome html report for Jasmine');
      });

      describe('And the repo jasmine-awesome-report is downloaded', () => {
        before('', (done) => {
          const file = fs.createWriteStream('repo.zip');
          https.get(`${repo.html_url}/archive/master.zip`, (responseZip) => {
            responseZip.pipe(file);
            done();
          });
        });
        it('Then the file must be download correctly', () => {
          expect(fs.existsSync('repo.zip')).to.be.true;
        });
      });
    });
  });
});
