import { useState } from 'react'

export default function Home() {
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/docker')
      const data = await res.json()
      setOutput(JSON.stringify(data.containers, null, 2))
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <button onClick={handleConnect} disabled={isLoading}>
        {isLoading ? 'Connecting...' : 'Connect'}
      </button>
      <pre>{output}</pre>
    </div>
  )
}
