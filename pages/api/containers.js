// /pages/api/containers.js
import Docker from 'dockerode';

const docker = new Docker();

export default async function handler(req, res) {
  try {
    const [containers, images] = await Promise.all([
      docker.listContainers({ all: true }),
      docker.listImages(),
    ]);

    res.status(200).json({ containers, images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
