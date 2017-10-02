const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');

const { expect } = chai;

describe('Given a POST PATCH tests', () => {
  let user = {};
  const repoToEdit = 'GCodes';
  it('Then the user logged must have at least 1 public repo', () =>
    agent.get('https://api.github.com/user')
      .auth('token', process.env.ACCESS_TOKEN).then((response) => {
        user = response.body;
        expect(user.public_repos).to.be.gte(1);
      }));

  describe(`When i get the ${repoToEdit} repository`, () => {
    it('Then the repo must exist', () => agent.get(user.repos_url)
      .auth('token', process.env.ACCESS_TOKEN).then((response) => {
        expect(response.body.find(element => element.name === repoToEdit)).to.exist;
      }));

    describe('And the issue will be create', () => {
      let issue;
      it('Then the issue is created', () =>
        agent.post(
          `https://api.github.com/repos/${user.login}/${repoToEdit}/issues`,
          { title: 'Test Issue' }
        )
          .auth('token', process.env.ACCESS_TOKEN).then((response) => {
            issue = response.body;
            expect(issue.title).to.equal('Test Issue');
            expect(issue.body).to.be.null;
          }));

      it('Then the issue must allow the edit action and work correctly', () =>
        agent.patch(
          `https://api.github.com/repos/${user.login}/${repoToEdit}/issues/${issue.number}`,
          { body: 'Body Issue' }
        )
          .auth('token', process.env.ACCESS_TOKEN).then((response) => {
            expect(response.body.title).to.equal('Test Issue');
            expect(response.body.body).to.be.equal('Body Issue');
          }));
    });
  });
});
