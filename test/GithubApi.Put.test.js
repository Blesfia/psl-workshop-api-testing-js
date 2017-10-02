const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('Given a PUT tests', () => {
  describe('When i want follow the aperdomob user', () => {
    it('Then the agent must use the correct request and response', () => agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN).then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
        expect(response.body).to.be.empty;
      }));

    it('Then the github user must have a aperdomob in following list', () => agent.get('https://api.github.com/user/following')
      .auth('token', process.env.ACCESS_TOKEN).then((response) => {
        const user = response.body.find(element => element.login === 'aperdomob');
        expect(user).to.exist;
      }));

    it('Then the agent must use the correct request and response', () => agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN).then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
        expect(response.body).to.be.empty;
      }));
  });
});
