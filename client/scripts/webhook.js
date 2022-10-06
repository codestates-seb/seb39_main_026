// 이 파일은 아래 명령으로 실행합니다.
// source ~/.bashrc && nohup node webhook.js </dev/null >/dev/null 2>&1 &

/* eslint-disable */
const spawn = require('child_process').spawn;
const crypto = require('crypto');
const http = require('http');
const url = require('url');

const secret = process.env.WEBHOOK_SECRET;
const port = 8888;

http
  .createServer(function (req, res) {
    const { method, headers } = req;
    const { pathname } = url.parse(req.url);

    if (pathname === '/' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true }));
    }

    if (
      pathname === '/' &&
      method === 'POST' &&
      headers['x-github-event'] === 'ping'
    ) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true }));
    }

    if (pathname != '/' || method != 'POST') {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(
        JSON.stringify({
          error: 'invalid request',
          pathname,
          method,
        })
      );
    }

    let body = '';
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', async function () {
      const payload = JSON.parse(decodeURIComponent(body.slice(8)));

      const { ref, repository } = payload;
      const { full_name } = repository;

      if (full_name !== 'codestates-seb/seb39_main_026') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'invalid repository' }));
      }

      if (ref !== 'refs/heads/main') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'invalid branch' }));
      }

      const hash = createHash({ secret, body });

      if (hash != headers['x-hub-signature']) {
        res.writeHead(400, { 'Content-Type': 'application/json' });

        return res.end(
          JSON.stringify({
            error: 'invalid hash key',
            "headers['x-hub-signature']": headers['x-hub-signature'],
            key: hash,
          })
        );
      }

      try {
        await runDeploy(`${__dirname}/stop-previous-deploy.sh`);
        await runDeploy(`${__dirname}/trigger-deploy.sh`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ success: true }));
    });
  })
  .listen(port);

console.log('Server listening at ' + port);

function createHash({ secret, body }) {
  return 'sha1=' + crypto.createHmac('sha1', secret).update(body).digest('hex');
}

async function runDeploy(filename) {
  return new Promise((resolve, reject) => {
    const deploySh = spawn('sh', [filename]);

    deploySh.stdout.on('data', function (data) {
      console.log(Buffer.from(data).toString('utf-8'));
    });

    deploySh.stderr.on('data', function (data) {
      console.log(Buffer.from(data).toString('utf-8'));
      reject(Buffer.from(data).toString('utf-8'));
    });

    deploySh.stdout.on('end', function (data) {
      resolve(true);
    });
  });
}
