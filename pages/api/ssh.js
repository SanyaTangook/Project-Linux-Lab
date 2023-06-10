import { Client } from 'ssh2';


const config = {
    host: '20.24.101.191',
    port: 22,
    username: 'sanya',
    password: 'L28v2T7GQdBI'
};

export default function sshHandler(req, res) {
  const command = req.query.command;

  if (!command) {
    return res.status(400).json({ error: 'ไม่ได้ระบุคำสั่ง' });
  }

  const conn = new Client();

  conn.on('ready', () => {
    conn.exec(command, (err, stream) => {
      if (err) {
        conn.end();
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการส่งคำสั่ง' });
      }

      let output = '';

      stream.on('close', (code, signal) => {
        conn.end();
        res.json({ command, output, code, signal });
      }).on('data', (data) => {
        output += data.toString();
      }).stderr.on('data', (data) => {
        output += data.toString();
      });
    });
  });

  conn.on('error', (err) => {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ SSH' });
  });

  conn.connect(config);
}