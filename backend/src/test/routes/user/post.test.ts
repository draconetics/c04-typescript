import { USER_NAME_MINIMUM, USER_PASSWORD_MINIMUM } from "../../../config/util";

export {};
const chaiLibrary = require('chai')

let app  = require('../../../app')
let chaiHttp = require('chai-http')
const User = require('../../../models/user')


chaiLibrary.should();
chaiLibrary.use(chaiHttp);
const {expect} = chaiLibrary;

console.log(process.env.NODE_ENV+"*****************")

describe('User API #POST', ()=>{
    before(function (done) 
            {
            User.deleteMany({}, function (err:object) {
                if (err) done(err);
                done();
            });
        })

    describe('User table is empty on database',()=>{
        
        it("should create one User by receiving correct User object",(done)=>{
            const user = {
                name:"pedro",
                email:"pedro@gmail.com",
                password:"pedro"
            };
            chaiLibrary.request(app)                
                .post("/api/user")
                .send(user)
                .end((err:object, response:any) => {
                    //console.log(response.body)
                    response.should.have.status(201);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("success");
                    body.should.have.property('data').a('object');
                    
                    expect(body.data).to.contain.property('_id');
                    expect(body.data).to.contain.property('name');
                    expect(body.data).to.contain.property('email');
                    expect(body.data).to.contain.property('password');
                done();
                });

        })

        it("should not create a User:object because user.name does not exist",(done)=>{
            const user = {
                email:"pedro@gmail.com",
                password:"pedro"
            };
            chaiLibrary.request(app)                
                .post("/api/user")
                .send(user)
                .end((err:object, response:any) => {
                    //console.log(response.body)
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Minimum length of name is " + USER_NAME_MINIMUM);
                    
                done();
                });
        })


        it("should not create a User:object because usear.name is empty",(done)=>{
            const user = {
                name:"",
                email:"pedro@gmail.com",
                password:"pedro"
            };
            chaiLibrary.request(app)                
                .post("/api/user")
                .send(user)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Minimum length of name is " + USER_NAME_MINIMUM);
                    
                done();
                });

        })


        it("should not create a User:object because user.password is undefined",(done)=>{
            const user = {
                name:"pedro",
                email:"pedro@gmail.com"
            };
            chaiLibrary.request(app)                
                .post("/api/user")
                .send(user)
                .end((err:object, response:any) => {
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Mimimum password length is " + USER_PASSWORD_MINIMUM);
                    
                done();
                });

        })

        it("should not create a User:object because user.name is another type of data",(done)=>{
            const user = {
                name:true,
                email:"pedro@gmail.com",
                password:"pedro"
            };
            chaiLibrary.request(app)                
                .post("/api/user")
                .send(user)
                .end((err:object, response:any) => {
                    //console.log(response.body)
                    response.should.have.status(422);
                    const body = response.body;
                    body.should.be.a('object');
                    body.should.have.property('status');
                    body.should.have.property('message').eq("Minimum length of name is " + USER_NAME_MINIMUM);
                    
                done();
                });

        })


    })

    
})