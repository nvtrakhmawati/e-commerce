const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

const expect = chai.expect;

describe('Item CRUD', function(){
    describe('POST /item', function(){
        it('should send an object with 201 status code', function(done){
            let input = {

            }
            chai
              .request(app)
              .post('/register')
              .then(function(res){
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name'); 
                expect(res.body).to.have.property('detail');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('image');
                expect(res.body).to.have.property('stock');
                done()
              })
              .catch(function(err){
                  console.log(err)
              })
        })
    })
})