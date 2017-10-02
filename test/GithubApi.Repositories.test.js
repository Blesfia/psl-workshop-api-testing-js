require('dotenv').config();
const chaiSubset = require('chai-subset');
require('chai').use(chaiSubset);
const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const https = require('https');
const fs = require('fs');
const md5File = require('md5-file');


describe('Given the exercise "Consumiendo Métodos GET"', () => {
  describe('When someone request for the user aperdomob', () => {
    let response = {};
    before('And the data is collected', () => agent.get('https://api.github.com/users/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((responseGitHub) => {
        response = responseGitHub.body;
      })
      .catch((reason) => {
        throw new Error(reason);
      }));

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
        .auth('token', process.env.ACCESS_TOKEN)
        .then((responseGitHub) => {
          response = responseGitHub.body;
          done();
        })
        .catch((reason) => {
          throw new Error(reason);
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

      describe('And the readme file is going to check', () => {
        let readmeWeb = {};
        before('', () => agent.get(`https://api.github.com/repos/aperdomob/${repo.name}/readme`)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((responseGitHub) => {
            readmeWeb = responseGitHub.body;
            const file = fs.createWriteStream('readmeTest.md');
            return https.get(readmeWeb.download_url, (responseReadme) => {
              responseReadme.pipe(file);
            });
          })
          .catch((reason) => {
            throw new Error(reason);
          }));

        it('Then the data must be the correct', () => {
          expect(readmeWeb).to.containSubset({
            name: 'README.md',
            path: 'README.md',
            sha: '9bcf2527fd5cd12ce18e457581319a349f9a56f3'
          });
        });

        it('Then the md5 must be the correct', () => {
          const hash = md5File.sync('readmeTest.md');
          expect(hash).to.equal(hash);
        });
      });
    });
  });
});
