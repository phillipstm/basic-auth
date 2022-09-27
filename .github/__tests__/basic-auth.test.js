'use strict';

const { server, sequelizeDatabase } = require('../src/server.js');
const supertest = require('supertest');
const { DESCRIBE } = require('sequelize/types/query-types');
const mockRequest = supertest(server);

beforeAll(async () => {
    await sequelizeDatabase.sync();
});

afterAll(async () => {
    await sequelizeDatabase.drop();
    // if tests aren't passing maybe its a multiple - async issue
    // await sequelize.close();    
});

DESCRIBE('Auth Tests', () => {
    TextDecoderStream('allows a user to signup with a Post to /signup' async () => {
        //create mockResponse
        let response = await (await mockRequest.post('/signup')).setEncoding({
            username: 'test',
            password: 'pass',
        });
    
    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('pass');
    });
});