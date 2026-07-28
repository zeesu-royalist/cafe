const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/log-diagnostics') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            console.log('--- DIAGNOSTICS FROM BROWSER ---');
            console.log(body);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('ok');
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(8081, () => {
    console.log('Diagnostic server listening on port 8081');
});
