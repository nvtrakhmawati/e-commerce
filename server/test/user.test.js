const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp)

const expect = chai.expect;

describe('User CRUD', function(){
    describe('POST /user/register', function(){
        it('should send an object with 201 status code', function(done){
            let user_input = {
                name: 'Novita', 
                email:'novita@gmail.com', 
                password:'1234'
            }
            chai
              .request(app)
              .post('/user/register')
              .send(user_input)
              .then(function(res){
                //validate
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');

                //new validation to confirm user is save in database
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');

                //validation to confirm password is encrypted
                expect(res.body.password).to.not.be.eql(user_input.password)
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
    describe('POST /user/login', function(){
        it('should return 200 and token for valid credentials', function(done){
            let valid_input ={
                email: 'novita@gmail.com',
                password: '1234'
            }
            chai
              .request(app)
              .post('/user/login')
              .send(valid_input)
              .then(function(res){
                //validate  
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');

                // new validation that user has been login
                expect(res.body).to.have.property('token');
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
    describe('Duplicate email for register', function(){
        it('should throw error with status 500', function(done){
            let valid_input ={
                name: 'Novita',
                email: 'novita@gmail.com',
                password: '1234'
            }
            chai
              .request(app)
              .post('/user/register')
              .send(valid_input)
              .then(function(res){
                //validate  
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');

                expect(res.body).to.have.property('message');
                console.log(res.body.message)
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
    describe('invalid format email', function(){
        it('should throw error with status 500', function(done){
            let valid_input ={
                name: 'Novita',
                email: 'novita@gmail.com',
                password: '1234'
            }
            chai
              .request(app)
              .post('/user/register')
              .send(valid_input)
              .then(function(res){
                //validate  
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');

                expect(res.body).to.have.property('message');
                console.log(res.body.message)
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
    describe('invalid length of password', function(){
        it('should throw error with status 500', function(done){
            let valid_input ={
                name: 'Novita',
                email: 'novita@gmail.com',
                password: '1234'
            }
            chai
              .request(app)
              .post('/user/register')
              .send(valid_input)
              .then(function(res){
                //validate  
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');

                expect(res.body).to.have.property('message');
                console.log(res.body.message)
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
})