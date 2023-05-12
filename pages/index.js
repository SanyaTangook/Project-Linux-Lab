import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await fetch('/api/docker');
    const data = await response.json();
    setMessage(data.message);
  };
  return (
    <div>
      <button onClick={handleClick}>Pull Docker image</button>
      <p>{message}</p>
    </div>
  );
}