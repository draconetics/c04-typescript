export {}
const chaiLibrary = require('chai')

let app  = require('../../../app')
let chaiHttp = require('chai-http')
const User = require('../../../models/user')

chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const {expect} = chaiLibrary;
console.log(process.env.NODE_ENV+"*****************")

describe('Auth API #login', ()=>{
    
  
    describe("LOGIN /api/login and LOGOUT /api/logout", ()=>{

        describe("Login with correct object:{email,password} and logout",()=>{

            const userSample = {
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro"
            }

            let TOKEN = ""

            before( function (done) {
                User.deleteMany({}, function (err:object) {
                    if (err) done(err);
                    
                    User.create(userSample, function (err:object) {
                        if (err) done(err);
                        done();
                    });
                })//end user
            });//end before
            it("should LOGIN receibing token", (done)=>{
                chaiLibrary.request(app)
                    .post("/api/login")
                    .send({email: "pedro@gmail.com", password: "pedro"})
                    .end((error:object, response:any)=>{
                        //console.log(response.body)
                        response.should.have.status(200);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('message')
                        response.body.should.have.property('data')
                        
                        TOKEN = response.body.data.token;
                        expect(response.body.data.user.tokens).to.have.lengthOf(1); 

                        done();
                    })
            })//end it

            it("it should LOGOUT receiving a success message", (done)=>{
                chaiLibrary.request(app)
                    .post("/api/logout")
                    .set({ "Authorization": `Bearer ${TOKEN}` })
                    .end((error:object, response:any)=>{
                        console.log(response.body)
                        response.should.have.status(200);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('data')
                        
                        expect(response.body.data.email).to.eql(userSample.email);
                        expect(response.body.data.tokens).to.have.lengthOf(0); 
                        done();
                    })
            })//end it

        })//end describe


        describe("login with incorrect data",()=>{

            const userSample = {
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro"
            }

            before( function (done) {
                User.deleteMany({}, function (err:object) {
                    if (err) done(err);
                    
                    User.create(userSample, function (err:object) {
                        if (err) done(err);
                        done();
                    });
                })//end user
            });//end before

            it("should not LOGIN because email is not registered", (done)=>{
                chaiLibrary.request(app)
                    .post("/api/login")
                    .send({email: "pedroooo@gmail.com", password: "pedro"})
                    .end((error:object, response:any)=>{
                        
                        response.should.have.status(500);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('message').eq("user not found");
                        
                        done();
                    })
            })//end it

            it("should not LOGIN beacouse password is wrong", (done)=>{
                chaiLibrary.request(app)
                    .post("/api/login")
                    .send({email: "pedro@gmail.com", password: "pedroooo"})
                    .end((error:object, response:any)=>{
                        //console.log(response.body)
                        response.should.have.status(422);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('message').eq("invalid credentials");
                        
                        done();
                    })
            })//end it

            it("should not LOGIN because password is integer", (done)=>{
                chaiLibrary.request(app)
                    .post("/api/login")
                    .send({email: "pedro@gmail.com", password: 1234})
                    .end((error:object, response:any)=>{
                        console.log(response.body)
                        response.should.have.status(422);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status')
                        response.body.should.have.property('message').eq("Mimimum password length is 3");
                        
                        done();
                    })
            })//end it


        })//end describe

        describe("user not login but go to /api/logout",()=>{
            it("should don logout because user has not logged before",(done)=>{
                chaiLibrary.request(app)
                    .post("/api/logout")
                    .end((error:object, response:any)=>{
                        //console.log(response.body)
                        response.should.have.status(403);

                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.should.have.property('message').eq("auth - User NO Authenticated");
                        
                        done();
                    })              
            })//end it
        });//end describe

        
    })

    
})