"use strict";
//process.env.NODE_ENV = 'test';
const chaiLibrary = require('chai');
let app = require('../../app');
let chaiHttp = require('chai-http');
const Note = require('../../models/note');
chaiLibrary.should();
chaiLibrary.use(chaiHttp);
console.log(process.env.NODE_ENV + "*****************");
describe('Note API', () => {
    /***
     * Ged route
     */
    describe("GET /api/notes", () => {
        describe("Database with Note table empty", () => {
            before(function (done) {
                Note.deleteMany({}, function (err) {
                    if (err)
                        done(err);
                    done();
                });
            });
            it("should GET 0 tasks", (done) => {
                chaiLibrary.request(app)
                    .get("/api/notes")
                    .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status');
                    response.body.should.have.property('message');
                    response.body.should.have.property('data');
                    chaiLibrary.expect(response.body.data).to.have.lengthOf(0);
                    done();
                });
            });
            describe("Inserting 1 Note object", () => {
                before(function (done) {
                    Note.create({ text: "this is a sample", complete: false }, function (err) {
                        if (err)
                            done(err);
                        done();
                    });
                });
                after(function (done) {
                    Note.deleteMany({}, function (err) {
                        if (err)
                            done(err);
                        done();
                    });
                });
                it("should GET an array with size 1", (done) => {
                    chaiLibrary.request(app)
                        .get("/api/notes")
                        .end((error, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        chaiLibrary.expect(response.body.data).to.have.lengthOf(1);
                        done();
                    });
                }); //end It
            }); //end describe
            describe("Empty database", () => {
                it("should not GET any task because wrong url", (done) => {
                    chaiLibrary.request(app)
                        .get("/api/note")
                        .end((error, response) => {
                        response.should.have.status(404);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message');
                        response.body.should.have.property('message').eq("'Unable to find the requested resource!'");
                        response.body.should.have.property('data');
                        done();
                    });
                });
            });
        });
    });
});
