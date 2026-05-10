import { useState } from 'react'
import './App.css'

function App() {
const [fernetKey, setFernetKey] = useState('')
const [encryptedPayload, setEncryptedPayload] = useState('')
const [decryptedPayload, setDecryptedPayload] = useState('')

  return (
    <main>
      <h1>Payload Decryption Tool</h1>
      <form>
        <label>Payload to decrypt</label>
        <input 
        type="text"
        onChange={(e) => setDecryptedPayload(e.target.value)}></input>
        <button>
          Run
        </button>
      </form>
    </main>
  )
}




export default App