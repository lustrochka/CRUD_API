import { validate, v4 } from 'uuid';

type user = {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export const users: user[] = [{
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'aaa',
    age: 5,
    hobbies: ['crying', 'eating']
},
{
    id: 'c9c9e90e-60c3-4c57-8c54-6c26bc6ab0c3',
    username: 'Jane',
    age: 20,
    hobbies: ['painting']
}]

export function getUser(id: string) {
    if (!validate(id)) return {code: 400, message: "Invalid id", contentType: 'text/plain'};

    const user = users.find((user) => user.id === id);

    if (!user) return {code: 404, message: "User doesn't exist", contentType: 'text/plain'};

    return {code: 200, message: JSON.stringify(user), contentType: 'application/json'};
}