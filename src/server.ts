import http from 'http';
import { users } from './users';
import { postUser } from './postUser';
import { getUser } from './getUser';
import { putUser } from './putUser';
import { deleteUser } from './deleteUser';

const PORT = process.env.PORT || 3000;
const baseUrl = '/api/users';

http
  .createServer((req, res) => {
    const { method, url } = req;

    if (!url) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Invalid URL');
    } else {
      try {
        switch (true) {
          case url === baseUrl && method === 'GET': {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
            break;
          }

          case url === baseUrl && method === 'POST': {
            let body = '';

            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', () => {
              const { code, message, contentType } = postUser(body);

              res.writeHead(code, { 'Content-Type': contentType });
              res.end(message);
            });
            break;
          }

          case url?.startsWith(baseUrl + '/') && method === 'GET': {
            const id = url.split('/')[3];
            const { code, message, contentType } = getUser(id);
            res.writeHead(code, { 'Content-Type': contentType });
            res.end(message);
            break;
          }

          case url?.startsWith(baseUrl + '/') && method === 'PUT': {
            let body = '';
            const id = url.split('/')[3];

            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', () => {
              const { code, message, contentType } = putUser(id, body);

              res.writeHead(code, { 'Content-Type': contentType });
              res.end(message);
            });
            break;
          }

          case url?.startsWith(baseUrl + '/') && method === 'DELETE': {
            const id = url.split('/')[3];
            const { code, message, contentType } = deleteUser(id);
            if (code === 204) {
              res.writeHead(204);
              res.end();
            } else {
              res.writeHead(code, { 'Content-Type': contentType });
              res.end(message);
            }
            break;
          }

          default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
      } catch {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
