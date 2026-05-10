import { useState } from 'react'
import './App.css'

function App() {
const [fernetKey, setFernetKey] = useState('')
const [encryptedPayload, setEncryptedPayload] = useState('')
const [decryptedPayload, setDecryptedPayload] = useState('')

  return (
    <main>
      <h1>Payload Decryption Tool</h1>
      <div>
        <button>
          Run
        </button>
      </div>
    </main>
  )
}




export default App