import http from 'http';
import { users, getUser } from './users';

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const { method, url } = req;
    if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else if (url?.startsWith("/api/users/")) {
        const id = url.split('/')[3];
        const { code, message, contentType } = getUser(id);
        res.writeHead(code, { 'Content-Type': contentType });
        res.end(message);
      }
}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});