import { useState } from 'react';

export default function Home() {
  const [commandOutput, setCommandOutput] = useState('');
  const [userInput, setUserInput] = useState('');

  const executeCommand = async () => {
    const response = await fetch(`/api/ssh?command=${encodeURIComponent(userInput)}`);
    const data = await response.json();
    setCommandOutput(data.output);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={executeCommand}>Execute Command</button>
      <pre>{commandOutput}</pre>
    </div>
  );
}
