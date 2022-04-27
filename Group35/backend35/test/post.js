const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Seller = require("../models/Seller")

chai.should();
chai.use(chaiHttp);

describe('/GET/:id seller', () => {
    it('it should GET a seller by the given id', (done) => {
        let seller = new Seller({
            sellername: 'varshini',
                email: 'kvsvarshini@gmail.com',
                password: 'varshini23',
                gst: 'GST123456789012',
            });
        seller.save((err, seller) => {
            chai.request(server)
          .get('/sellers/' + seller.id)
          .send(seller)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('sellername');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('gst');

            done();
          });
        });

    });
});

describe('/DELETE/:id seller', () => {
    it('it should DELETE a seller given the id', (done) => {
        let seller = new Seller({
            sellername: 'varshini',
                email: 'kvsvarshini@gmail.com',
                password: 'varshini23',
                gst: 'GST123456789012',
            })
        seller.save((err, seller) => {
              chai.request(server)
              .delete('/sellers/' + seller.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('deleted sucessfully');
                done();
              });
        });
    });
});

describe('Seller Api', () => {
    describe("GET All SELLERS", () => {
        it("It should return all the sellers", (done)=>{
            chai.request(server)
            .get("/sellers")
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                done();
            })
        })
    })
    
});


describe('/Seller POST Api', () => {
    describe("POST A SELLER", () => {
        it("It should return new seller", (done)=>{
            let seller = {
                sellername: 'varshini',
                email: 'kvsvarshini@gmail.com',
                password: 'varshini23',
                gst: 'GST123456789012',
            }
            chai.request(server)
            .post("/sellers")
            .send(seller)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('sellername');
                res.body.should.have.property('password');
                res.body.should.have.property('gst');
                done();
            })
        })
    })
    
});






