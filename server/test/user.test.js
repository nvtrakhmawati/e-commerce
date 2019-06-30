const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app'),
  clearUser = require('./helper/clearUser')


chai.use(chaiHttp)

before(function (done) {
  const newUser = {
      name: "name",
      email: "email@mail.com",
      password: "password"
  }

  chai
      .request(app)
      .post('/user/register')
      .send(newUser)
      .end(function (err, res) {
          userId = res.body._id
          done()
      })
})

after(function (done) {
  clearUser(done)
})

describe('User tests', function () {
  describe('GET /users', function () {
      it("should send an array of object with status code 200", function (done) {
          chai
              .request(app)
              .get('/users')
              .end(function (err, res) {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('array');
                  done();
              });
      })
  })
  describe("POST /users/login", function () {
      it("Should send a token generated from payload of logged in user", function (done) {
          const input = { email: "email@mail.com", password: "password" }
          chai
              .request(app)
              .post("/users/login")
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(200)
                  done()
              })
      })
  })
  // No matching profile
  describe("POST /users/login", function () {
      it("Should send an error because no matching profile found", function (done) {
          const input = { password: "password" }
          chai
              .request(app)
              .post("/users/login")
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  done()
              })
      })
  })
  // No matching profile
  describe("POST /users/login", function () {
      it("Should send an error beacuse no matching profile found", function (done) {
          const input = { email: "email@mail.com" }
          chai
              .request(app)
              .post("/users/login")
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  })
  describe("POST /user/register", function () {
      it("Should send an object of recently registered user", function (done) {
          const input = { name: "name", email: "newEmail@mail.com", password: "password" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(201)
                  expect(res.body).to.be.an("object")
                  expect(res.body).to.have.property("name")
                  expect(res.body).to.have.property("email")
                  expect(res.body).to.have.property("password")
                  expect(res.body.name).to.equal(input.name)
                  expect(res.body.email).to.equal(input.email)
                  expect(res.body.password).to.not.equal(input.password)
                  done()
              })
      })
  })
  // Must register unique email
  describe("POST /users/register", function () {
      it("Should return an error for using registered email with status 500", function (done) {
          const input = { name: "name", email: "email@mail.com", password: "password" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  })
  // Must register with valid email
  describe("POST /users/register", function () {
      it("Should return an error for using an invalid email with status 500", function (done) {
          const input = { name: "name", email: "email", password: "password" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  }),
  // Not registered with a name
  describe("POST /users/register", function () {
      it("Should return an error for not using an name with status 500", function (done) {
          const input = { email: "email", password: "password" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  })
  // Not registered with an email
  describe("POST /users/register", function () {
      it("Should return an error for not using an email with status 500", function (done) {
          const input = { name: "name", password: "password" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  })
  // Not registered with a password
  describe("POST /users/register", function () {
      it("Should return an error for not using a password with status 500", function (done) {
          const input = { name: "name", email: "email" }
          chai
              .request(app)
              .post('/users/register')
              .send(input)
              .end(function (err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  done()
              })
      })
  })
})