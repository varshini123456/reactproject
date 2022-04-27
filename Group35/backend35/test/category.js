const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

const Category = require("../models/category")

describe('/GET category Api', () => {
    describe("GET All CATEGORIES", () => {
        it("It should return all the categories", (done)=>{
            chai.request(server)
            .get("/categories")
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                done();
            })
        })
    })
    
});


describe('/POST Category Api', () => {
    describe("POST A CATEGORY", () => {
        it("It should return new category", (done)=>{
            let category = {
                Name : 'Furniture'
            }
            chai.request(server)
            .post("/categories")
            .send(category)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('Name');
                done();
            })
        })
    })
    
});


describe('/GET/:id category', () => {
    it('it should GET a category by the given id', (done) => {
        let category = new Category({
            Name : 'Furniture'
            });
        category.save((err, category) => {
            chai.request(server)
          .get('/categories/' + category.id)
          .send(category)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('Name');

            done();
          });
        });

    });
});


describe('/DELETE/:id category', () => {
    it('it should DELETE a category given the id', (done) => {
        let category = new Category({Name : 'Furniture'})
        category.save((err, category) => {
              chai.request(server)
              .delete('/categories/' + category.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('deleted');
                done();
              });
        });
    });
});