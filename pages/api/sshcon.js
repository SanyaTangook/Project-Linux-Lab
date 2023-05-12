import { Client } from 'ssh2'
import Docker from 'dockerode'

export default function handler(req, res) {
  // กำหนดข้อมูลการเชื่อมต่อ SSH
  const sshConfig = {
    host: 'localhost',
    port: 22,
    username: 'root',
    password: 'password'
  }

  // เชื่อมต่อ SSH
  const ssh = new Client()
  ssh.on('ready', () => {
    // เชื่อมต่อ Docker API
    const docker = new Docker({ socketPath: '/var/run/docker.sock' })

    // ดึงรายการ Container
    docker.listContainers((err, containers) => {
      if (err) {
        res.status(500).json({ message: 'Failed to fetch containers' })
        ssh.end()
        return
      }

      // ส่งรายการ Container กลับไปยัง Client
      res.status(200).json({ containers })
      ssh.end()
    })
  })
  ssh.connect(sshConfig)
}
