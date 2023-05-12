const WebSocket = require('ws');
const { exec } = require('child_process');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  const docker = exec('docker  -it --rm ubuntu', { shell: true });

  docker.stdout.on('data', (data) => {
    ws.send(data.toString());0
  });

  docker.stderr.on('data', (data) => {
    ws.send(data.toString());
  });

  docker.on('exit', (code) => {
    ws.send(`Exited with code ${code}\n\r`);
  });

  ws.on('message', (message) => {
    docker.stdin.write(message.toString());
  });

  ws.on('close', () => {
    docker.kill();
  });
});
