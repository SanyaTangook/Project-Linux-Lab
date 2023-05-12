import Docker from 'dockerode';

export default async (req, res) => {
  // สร้าง Docker client
  const docker = new Docker();

  // รับชื่อ Docker Image จาก query parameter ชื่อ image
  const image = req.query.image;

  // สร้าง container จาก Docker Image โดยใช้คำสั่ง run
  const container = await docker.createContainer({
    Image: image,
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: ['/bin/bash']
  });

  // สั่งให้ container รัน
  await container.start();

  // ส่งข้อมูล response กลับไปยัง client
  res.status(200).json({ message: `Container ${container.id} is running` });
};
