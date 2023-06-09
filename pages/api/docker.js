import { spawn } from "child_process";
import cors from "cors";
import { Stream } from "stream";

// กำหนดค่าที่ใช้งาน
const DOCKER_IMAGE_NAME = "ubuntu"; // ชื่อ Docker image ที่ต้องการดึง
const DOCKER_IMAGE_TAG = "20.4"; // ชื่อ tag ของ Docker image
const DOCKER_HUB_USERNAME = "sanyats"; // Docker Hub username
const DOCKER_PULL_COMMAND = `docker pull ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}`; //คำสั่งดึง Docker image
const DOCKER_RUN_COMMAND = `docker run -i ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}`; //คำสั่งรัน

const corsHandler = cors({
  methods: ["GET", "HEAD"],
});

// ฟังก์ชัน API สำหรับดึง Docker image จาก Docker Hub และติดตั้งลงในเครื่อง
export default async function handler(req, res) {
  corsHandler(req, res, async () => {
    // ดึง Docker image จาก Docker Hub โดยใช้คำสั่ง Shell
    const pullProcess = spawn(DOCKER_PULL_COMMAND, [], {
      shell: true,
    });

    // คำสั่งในการ run
    const runProcess = spawn(DOCKER_RUN_COMMAND, [], {
      shell: true,
    });
    // รอการดึง Docker image เสร็จสิ้น
    pullProcess.on("close", async (code) => {
      if (code !== 0) {
        // หากเกิดข้อผิดพลาดในการดึง Docker image ให้ส่งข้อความแจ้งเตือนกลับไปยังเว็บแอปพลิเคชัน
        res.status(500).json({ message: "Failed to pull Docker image" });
      } else {
        // หากดึง Docker image เสร็จสิ้นสำเร็จ ส่งข้อความตอบกลับเป็น JSON ที่บอกว่าดึง Docker image เสร็จสิ้น
        res
          .status(200)
          .json({
            message: `Docker image pulled & run ${DOCKER_IMAGE_NAME} successfully`,
          });
      }
    });
  });
}
