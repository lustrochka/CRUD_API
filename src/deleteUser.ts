import { users } from './users';
import { validate } from 'uuid';

export function deleteUser(id: string) {
  if (!validate(id)) return { code: 400, message: 'Invalid id', contentType: 'text/plain' };

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return { code: 404, message: "User doesn't exist", contentType: 'text/plain' };

  users.splice(index, 1);
  return { code: 204 };
}
