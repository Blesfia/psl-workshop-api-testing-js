const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');

const { expect } = chai;

describe('Given a Query parameters tests', () => {
  describe('When i want to test users', () => {
    it('Then i have how many users by default are retrieved', () =>
      agent.get('https://api.github.com/users')
        .auth('token', process.env.ACCESS_TOKEN).then((response) => {
          expect(response.body.length).to.be.equal(30);
        }));
    it('Then i have 10 users by default are retrieved', () =>
      agent.get('https://api.github.com/users?per_page=10')
        .auth('token', process.env.ACCESS_TOKEN).then((response) => {
          expect(response.body.length).to.be.equal(10);
        }));
    it('Then i have 50 users by default are retrieved', () =>
      agent.get('https://api.github.com/users?per_page=50')
        .auth('token', process.env.ACCESS_TOKEN).then((response) => {
          expect(response.body.length).to.be.equal(50);
        }));
  });
});
