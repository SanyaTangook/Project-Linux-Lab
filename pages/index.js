import { useState } from 'react';


export default function Home() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await fetch('/api/config');
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