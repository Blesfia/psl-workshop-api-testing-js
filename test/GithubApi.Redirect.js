const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('Given a HEAD tests', () => {
  it('Then the agent must receive a redirect with HEAD Method', () => agent.head('https://github.com/aperdomob/redirect-test')
    .auth('token', process.env.ACCESS_TOKEN).catch((response) => {
      expect(response.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(response.response.res.headers.location).to.equal('https://github.com/aperdomob/new-redirect-test');
    }));
  it('Then the agent must receive a redirect with GET Method', () => agent.get('https://github.com/aperdomob/redirect-test')
    .auth('token', process.env.ACCESS_TOKEN).then((response) => {
      expect(response.status).to.equal(statusCode.OK);
    }));
});
