const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);


describe('/GET User Api', () => {
    describe("GET All Users", () => {
        it("It should return all the users", (done)=>{
            chai.request(server)
            .get("/users")
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                done();
            })
        })
    })
    
});


describe('/User POST Api', () => {
    describe("POST A USER", () => {
        it("It should return new user", (done)=>{
            let user = {
                username: 'varshini',
                email: 'kvarshini@gmail.com',
                password: 'varshini23'
                }
            chai.request(server)
            .post("/users")
            .send(user)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                done();
            })
        })
    })
    
});