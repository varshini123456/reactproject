const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

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




