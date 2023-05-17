import { useState } from 'react';
import styles from "@/styles/Home.module.css"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

export default function Home() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await fetch('/api/docker');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <button onClick={handleClick}>Pull & Run Docker image in my PC</button>
      <p>{message}</p>
    </div>
  );
}