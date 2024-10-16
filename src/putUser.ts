import { users, isUser } from './users';
import { validate } from 'uuid';

export function putUser(id: string, body: string) {
  if (!validate(id)) return { code: 400, message: 'Invalid id', contentType: 'text/plain' };

  const index = users.findIndex((user) => user.id === id);

  if (!index) return { code: 404, message: "User doesn't exist", contentType: 'text/plain' };

  try {
    const parsedBody = JSON.parse(body);
    if (isUser(parsedBody)) {
      users[index] = parsedBody;
      return { code: 200, message: JSON.stringify(parsedBody), contentType: 'application/json' };
    } else {
      return { code: 400, message: 'Invalid body', contentType: 'text/plain' };
    }
  } catch {
    return { code: 400, message: 'Invalid body', contentType: 'text/plain' };
  }
}
