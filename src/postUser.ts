import { users, isUser } from './users';
import { v4 } from 'uuid';

export function postUser(body: string) {
  try {
    const parsedBody = JSON.parse(body);
    if (isUser(parsedBody)) {
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
