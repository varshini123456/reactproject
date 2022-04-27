const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../models/User")

chai.should();
chai.use(chaiHttp);

describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
        let user = new User({
            username: 'varshini',
            email: 'kvarshini@gmail.com',
            password: 'varshini23'
            });
        user.save((err, user) => {
            chai.request(server)
          .get('/users/' + user.id)
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
            done();
          });
        });

    });
});



describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
        let user = new User({username: 'varshini',
        email: 'kvarshini@gmail.com',
        password: 'varshini23'})
        user.save((err, user) => {
              chai.request(server)
              .delete('/users/' + user.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('deleted');
                done();
              });
        });
    });
});


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