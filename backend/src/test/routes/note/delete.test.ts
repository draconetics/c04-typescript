export {}
const chaiLibrary = require('chai')

let app  = require('../../../app')
let chaiHttp = require('chai-http')
const Note = require('../../../models/note')

chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const {expect} = chaiLibrary;
console.log(process.env.NODE_ENV+"*****************")


describe("Note API #DELETE", ()=>{
    
    describe("DELETE /api/notes/:id",()=>{
        
        describe("When Database is empty",()=>{
            before(function (done) 
            {
                Note.deleteMany({}, function (err:object) {
                    if (err) done(err);
                    done();
                });
            })
            it("should delete nothing",(done)=>{
                let correctId = "5f9c900f8c9dd4134c9b9163"
                chaiLibrary.request(app)
                        .delete("/api/notes/"+correctId)
                        .end((error:object, response:any)=>{
                            response.should.have.status(500);
                            response.body.should.be.a('object');
                            response.body.should.have.property('status')
                            response.body.should.have.property('message')
                            response.body.should.have.property('message').eq("Not found element to delete")
                            response.body.should.have.not.property('data')
                            
                            done();
                    })
            })
        })//end describe

        describe("When Database has one element",()=>{
            let ID_NOTE=""
            before( function (done) {
                Note.create({text:"this is a sample", complete:false}, function (err:object, res:any) {
                if (err) done(err);
                    ID_NOTE = res._id;
                    done();
                });
            })

            it("should delete by id",(done)=>{
                
                chaiLibrary.request(app)
                        .delete("/api/notes/"+ID_NOTE)
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
        })//end describe
    })
})