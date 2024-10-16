interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'aaa',
    age: 5,
    hobbies: ['crying', 'eating'],
  },
  {
    id: 'c9c9e90e-60c3-4c57-8c54-6c26bc6ab0c3',
    username: 'Jane',
    age: 20,
    hobbies: ['painting'],
  },
];

export function isUser(body: Partial<User>) {
  const { username, age, hobbies } = body;
  return (
    username &&
    typeof username === 'string' &&
    age &&
    typeof age === 'number' &&
    hobbies &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
  );
}
