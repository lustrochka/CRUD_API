import http from 'http';
import { users } from './users';

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const { method, url } = req;
    if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      }
}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});