"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chaiLibrary = require('chai');
let app = require('../../../app');
let chaiHttp = require('chai-http');
const User = require('../../../models/user');
chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const { expect } = chaiLibrary;
console.log(process.env.NODE_ENV + "*****************");
describe('User API #GET', () => {
    /***
     * Ged route
     */
    describe("GET /api/user", () => {
        describe("Database User table is empty", () => {
            before(function (done) {
                User.deleteMany({}, function (err) {
                    if (err)
                        done(err);
                    done();
                });
            });
            it("should GET 0 users", (done) => {
                chaiLibrary.request(app)
                    .get("/api/user")
                    .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status');
                    response.body.should.have.property('message');
                    response.body.should.have.property('data');
                    expect(response.body.data).to.have.lengthOf(0);
                    done();
                });
            });
            describe("Inserting 1 User object", () => {
                before(function (done) {
                    User.create({ name: "pedro", email: "pedro@gmail.com", password: "pedro" }, function (err) {
                        if (err)
                            done(err);
                        done();
                    });
                });
                after(function (done) {
                    User.deleteMany({}, function (err) {
                        if (err)
                            done(err);
                        done();
                    });
                });
                it("should GET an array with size 1", (done) => {
                    chaiLibrary.request(app)
                        .get("/api/user")
                        .end((error, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        //console.log(response.body.data)
                        chaiLibrary.expect(response.body.data).to.have.lengthOf(1);
                        chaiLibrary.expect(response.body.data[0].password).to.not.eql("pedro");
                        done();
                    });
                }); //end It
            }); //end describe
            describe("User table is empty", () => {
                it("should not GET any task because wrong url", (done) => {
                    chaiLibrary.request(app)
                        .get("/api/users") //url is wrong
                        .end((error, response) => {
                        response.should.have.status(404);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('message').eq("Resource not found");
                        response.body.should.not.have.property('data');
                        done();
                    });
                });
            });
            describe("User table has one element", () => {
                let ID_NOTE = "";
                before(function (done) {
                    User.create({ name: "juan", email: "juan@gmail.com", password: "juan" }, function (err, res) {
                        if (err)
                            done(err);
                        ID_NOTE = res._id;
                        //console.log("+++++++++++++++++++++++++",ID_NOTE)
                        done();
                    });
                });
                it("should GET a User by id", (done) => {
                    chaiLibrary.request(app)
                        .get("/api/user/" + ID_NOTE)
                        .end((error, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('message').eq("success");
                        response.body.should.have.property('data');
                        chaiLibrary.expect(response.body.data.name).to.eql("juan");
                        done();
                    });
                });
                it("should GET nothing because Id is correct but not exist on database", (done) => {
                    let correctId = "5f9c900f8c9dd4134c9b9163";
                    let incorrectId = "5f9c900f8c9dd4134c9b9162";
                    chaiLibrary.request(app)
                        .get("/api/user/" + incorrectId)
                        .end((error, response) => {
                        response.should.have.status(500);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('message').eq("User not Found");
                        response.body.should.have.not.property('data');
                        done();
                    });
                }); //end it
                it("should GET nothing because Id is incorrect", (done) => {
                    let correctId = "5f9c900f8c9dd4134c9b9163";
                    let incorrectId = "5f9c900f8c9dd4134c";
                    chaiLibrary.request(app)
                        .get("/api/user/" + incorrectId)
                        .end((error, response) => {
                        response.should.have.status(404);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('message').eq("Resource not found");
                        response.body.should.have.not.property('data');
                        done();
                    });
                }); //end it
            });
        });
    });
});
