const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

const Brand = require("../models/brand")

describe('/GET brand Api', () => {
    describe("GET All BRANDS", () => {
        it("It should return all the brands", (done)=>{
            chai.request(server)
            .get("/brands")
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                done();
            })
        })
    })
    
});