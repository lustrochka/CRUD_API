import { server } from "../server";
import supertest from 'supertest';
import { User } from "../users";

describe('API endpoints', () => {
    let expectedUser: User;

    afterAll(() => {
      server.close();
    });
  
    it('should return users with GET', async () => {
      const res = await supertest(server).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should create a user with POST', async () => {
        const newUser = { username: 'New User', age: 15, hobbies: ['testing'] };
        const res = await supertest(server)
          .post('/api/users')
          .send(newUser);
        
        expect(res.statusCode).toBe(201);

        const responseUser = res.body;
        
        expectedUser = { id: responseUser.id, ...newUser };
        expect(responseUser).toEqual(expectedUser);
      });

    it('should return user by ID with GET', async () => {
        const res = await supertest(server).get(`/api/users/${expectedUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expectedUser);
      });
})