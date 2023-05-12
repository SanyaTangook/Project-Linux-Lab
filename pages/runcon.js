import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  async function handleButtonClick() {
    try {
      const res = await fetch('/api/run-container?image=sanyats/ubuntu:20.4');
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + error.message);
    }
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Run Container</button>
      {message && <p>{message}</p>}
    </div>
  );
}
