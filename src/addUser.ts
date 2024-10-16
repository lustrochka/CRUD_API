import { users } from "./users";
import { v4 } from 'uuid';

export function addUser(body: string) {
    try {
      const parsedBody = JSON.parse(body);
      const { username, age, hobbies } = parsedBody;
      if (
        username &&
        typeof username === 'string' &&
        age &&
        typeof age === 'number' &&
        hobbies &&
        Array.isArray(hobbies) &&
        hobbies.every((hobby) => typeof hobby === 'string')
      ) {
        parsedBody.id = v4();
        users.push(parsedBody);
        return { code: 201, message: JSON.stringify(parsedBody), contentType: 'application/json' };
      } else {
        return { code: 400, message: 'Invalid body', contentType: 'text/plain' };
      }
    } catch {
      return { code: 400, message: 'Invalid body', contentType: 'text/plain' };
    }
  }