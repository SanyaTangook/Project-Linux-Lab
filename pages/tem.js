import React, { useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
const self = typeof window !== 'undefined' ? window : global;

const IndexPage = () => {
  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal'));
    fitAddon.fit();

    // เชื่อมต่อ Terminal กับ Docker
    const socket = new WebSocket('ws://localhost:3000/ws');

    // เมื่อต่อสำเร็จ ให้แสดงข้อความ welcome message
    socket.addEventListener('open', (event) => {
      term.write('Connected to Docker\n\r');
    });

    // เมื่อมีข้อมูลที่อ่านได้จาก Docker ให้แสดงผลใน Terminal
    socket.addEventListener('message', (event) => {
      term.write(event.data);
    });

    // เมื่อ Terminal พิมพ์คำสั่ง ให้ส่งไปที่ Docker
    term.onData((data) => {
      socket.send(data);
    });

    // เมื่อหน้าเว็บถูกปิด ให้ยกเลิกการเชื่อมต่อกับ Docker
    return () => {
      socket.close();
    };
  }, []);

  return <div id="terminal"></div>;
};

export default IndexPage;
