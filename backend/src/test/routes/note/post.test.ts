export {};
const chaiLibrary = require('chai')

let app  = require('../../../app')
let chaiHttp = require('chai-http')
const Note = require('../../../models/note')


chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const {expect} = chaiLibrary;

console.log(process.env.NODE_ENV+"*****************")

describe('Note API #POST', ()=>{
    before(function (done) 
            {
            Note.deleteMany({}, function (err:object) {
                if (err) done(err);
                done();
            });
        })

    describe('Note table is empty on database',()=>{
        
        it("should create one Note by receiving correct Note object",(done)=>{
            const task = {
                text: "Task 4",
                complete: false
            };
            chaiLibrary.request(app)                
                .post("/api/notes")
                .send(task)
                .end((err:object, response:any) => {
                    response.should.have.status(201);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("success");
                    body.should.have.property('data').a('object');
                    
                    expect(body.data).to.contain.property('_id');
                    expect(body.data).to.contain.property('text');
                    expect(body.data).to.contain.property('complete');
                done();
                });

        })

        it("should not create a Note:object because note.text does not exist",(done)=>{
            const task = {
                complete: true
            };
            chaiLibrary.request(app)                
                .post("/api/notes")
                .send(task)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Text is not type string and it is required");
                    
                done();
                });
        })


        it("should not create a Note:object because note.text is empty",(done)=>{
            const task = {
                text: ""
            };
            chaiLibrary.request(app)                
                .post("/api/notes")
                .send(task)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Text is empty");
                    
                done();
                });

        })


        it("should not create a Note:object because note.complete is undefined",(done)=>{
            const task = {
                text: "this is a sample"
            };
            chaiLibrary.request(app)                
                .post("/api/notes")
                .send(task)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Complete is not type boolean and it is required");
                    
                done();
                });

        })

        it("should not create a Note:object because note.complete is another type of data",(done)=>{
            const task = {
                text: "this is a sample",
                complete:"false"
            };
            chaiLibrary.request(app)                
                .post("/api/notes")
                .send(task)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Complete is not type boolean and it is required");
                    
                done();
                });

        })


    })

    describe('another test',()=>{
        
        

    })
})