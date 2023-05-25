import React, { useEffect } from "react";
import { Terminal } from "xterm";

// const DOCKER_RUN_COMMAND = `docker run -i ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}`; //คำสั่งรัน

function TerminalComponent() {
  useEffect(() => {
    const terminalContainer = document.getElementById("terminal");
    var term = new Terminal();
    term.open(terminalContainer);

    // เพิ่มคำสั่งที่จะถูกส่งไปยังเทอร์มินัลเชลล์
    term.onData((data) => {
      // ส่งคำสั่งไปยังแอปพลิเคชันหลักของคุณ
      console.log("Received data:", data);
      // ตัวอย่างเพิ่มฟังก์ชันที่คุณต้องการให้ทำงานกับข้อมูลที่ได้รับ
    });

    // จัดการกับการกดปุ่มบนคีย์บอร์ด
    term.attachCustomKeyEventHandler((event) => {
      // ตรวจสอบกดปุ่มต่างๆ แล้วส่งคำสั่งไปยังแอปพลิเคชันหลักของคุณ
      console.log("Received key event:", event);
      // ตัวอย่างการจัดการกับปุ่มที่คุณต้องการให้ทำงาน
    });
  }, []);

  return <div id="terminal" />;
}

export default TerminalComponent;
