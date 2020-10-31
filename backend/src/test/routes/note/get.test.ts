export {}
const chaiLibrary = require('chai')

let app  = require('../../../app')
let chaiHttp = require('chai-http')
const Note = require('../../../models/note')

chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const {expect} = chaiLibrary;
console.log(process.env.NODE_ENV+"*****************")

describe('Note API #GET', ()=>{
    /***
     * Ged route
     */
  
    describe("GET /api/notes", ()=>{

        describe("Database Note table is empty",()=>{
            before( function (done) {
                Note.deleteMany({}, function (err:object) {
                if (err) done(err);
                done();
                });
            })
            it("should GET 0 tasks", (done)=>{
                chaiLibrary.request(app)
                    .get("/api/notes")
                    .end((error:object, response:any)=>{
                        response.should.have.status(200);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('message')
                        response.body.should.have.property('data')
                        
    
                        expect(response.body.data).to.have.lengthOf(0); 
                        done();
                    })
            })

            describe("Inserting 1 Note object", ()=>{
                
                before( function (done) {
                    Note.create({text:"this is a sample", complete:false}, function (err:object) {
                    if (err) done(err);
                    done();
                    });
                })

                after( function (done) {
                    Note.deleteMany({}, function (err:object) {
                    if (err) done(err);
                    done();
                    });
                })

                it("should GET an array with size 1",(done)=>{
                    chaiLibrary.request(app)
                        .get("/api/notes")
                        .end((error:object, response:any)=>{
                            response.should.have.status(200);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('data')
                            

                            chaiLibrary.expect(response.body.data).to.have.lengthOf(1); 
                            done();
                    })
                })//end It
                
            })//end describe

            describe("Note table is empty",()=>{
                
                it("should not GET any task because wrong url",(done)=>{
                    chaiLibrary.request(app)
                        .get("/api/note")
                        .end((error:object, response:any)=>{
                            response.should.have.status(404);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('message').eq("Resource not found")
                            response.body.should.not.have.property('data')
                            
                            done();
                    })
                })
            })


            describe("Note table has one element",()=>{
                let ID_NOTE=""
                before( function (done) {
                    Note.create({text:"this is a sample", complete:false}, function (err:object, res:any) {
                    if (err) done(err);
                        ID_NOTE = res._id;
                        done();
                    });
                    
                    
                })
                it("should GET a Note by id",(done)=>{
                    chaiLibrary.request(app)
                        .get("/api/notes/"+ID_NOTE)
                        .end((error:object, response:any)=>{
                            response.should.have.status(200);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('message').eq("success")
                            response.body.should.have.property('data')
                            
                            done();
                    })
                })

                it("should GET nothing because Id is correct but not exist on database",(done)=>{
                    let correctId = "5f9c900f8c9dd4134c9b9163"
                    let incorrectId = "5f9c900f8c9dd4134c9b9162"
                    chaiLibrary.request(app)
                        .get("/api/notes/"+incorrectId)
                        .end((error:object, response:any)=>{
                            response.should.have.status(500);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('message').eq("Note not Found")
                            response.body.should.have.not.property('data')
                            
                            done();
                    })

                })//end it

                it("should GET nothing because Id is incorrect",(done)=>{
                    let correctId = "5f9c900f8c9dd4134c9b9163"
                    let incorrectId = "5f9c900f8c9dd4134c"
                    chaiLibrary.request(app)
                        .get("/api/notes/"+incorrectId)
                        .end((error:object, response:any)=>{
                            response.should.have.status(404);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('message').eq("Resource not found")
                            response.body.should.have.not.property('data')
                            
                            done();
                    })

                })//end it

            })

        })
        
    })

    
})