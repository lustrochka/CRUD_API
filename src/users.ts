export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [];

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
