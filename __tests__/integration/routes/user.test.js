const app = require('../../../server/server');
const supertest = require('supertest');
const request = supertest(app);

const server = 'http://localhost:3000';
let count = 30;
describe('User Route tests', () => {
  const newUser = {
    email: `onchirim${++count}@msu.edu`,
    password: 'password',
  };
  const invalidUser = {
    email: `onchirim${++count}@msu.edu`,
  };
  const invalidUser2 = {
    email: `onchirim${++count}@msu.edu`,
    password: 22,
  };

  describe('/user', () => {
    describe('GET', () => {
      xit('responds with a 200 status and returns a content type of application json', () => {
        return request
          .get('/user')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      it('responds with a 200 status, expects the email to be the value that was given and returns an object with a properties id and email', () => {
        return request
          .post('/user')
          .send(newUser)
          .expect(200)
          .expect((res) => {
            expect(res.body.user.email).toBe(newUser.email);
          })
          .expect((res) => {
            expect(res.body.user).toHaveProperty('id');
          });
      });
      it('responds to invalid request or invalid query with a 300 status and an error message in body', () => {
        return request
          .post('/user')
          .send(invalidUser2)
          .expect(300)
          .then(({ body }) => expect(body).toHaveProperty('err'));
      });
    });
  });
});
