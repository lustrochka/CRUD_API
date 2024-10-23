import { validate } from 'uuid';
import { users } from './users';

export function getUser(id: string) {
  if (!validate(id)) return { code: 400, message: 'Invalid id', contentType: 'text/plain' };

  const user = users.find((user) => user.id === id);

  if (!user) return { code: 404, message: "User doesn't exist", contentType: 'text/plain' };

  return { code: 200, message: JSON.stringify(user), contentType: 'application/json' };
}
