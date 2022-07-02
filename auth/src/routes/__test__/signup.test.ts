import request from 'supertest';
import { app } from '../../app';


it('returns a 201 on successful signup',async ()=> {
    return request(app)
    .post('/api/users/signup')
    .send({
        email:'aaaa@gmail.com',
        password:'1234567',
        role:'normal',
        userName:'anshad'

    })
    .expect(201);
  
})