import { useState } from 'react'
import './App.css'

function App() {
  const [fernetKey, setFernetKey] = useState('');
  const [encryptedPayload, setEncryptedPayload] = useState('');
  const [decryptedPayload, setDecryptedPayload] = useState('');

  async function sendRequest() {  
    const data = {"encrypted_payload": encryptedPayload, "fernet_key": fernetKey}
    try {
      const res = await fetch("http://127.0.0.1:8000/decrypt", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
        method: "POST"})
      if (res.ok) {
        const parsedRes = await res.json()
        setDecryptedPayload(parsedRes.decrypted_payload)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  
    return (
      <main>
        <h1>Payload Decryption Tool</h1>
        <form>
          <label 
            htmlFor="encrypted-payload">Payload to decrypt</label>
          <br></br>
          <input 
            id="encrypted-payload"
            type="textarea"
            onChange={(e) => setEncryptedPayload(e.target.value)}>
          </input>
          <br></br>
          <label
            htmlFor="decryption-key">
            Key
          </label>
          <br></br>
          <input
            id="decryption-key"
            type="text"
            onChange={(e) => setFernetKey(e.target.value)}>
          </input>
          <br></br>
          <button
            onClick={(sendRequest)}>
            Run
          </button>
        </form>
        {decryptedPayload && <p>{decryptedPayload}</p>}
      </main>
    )
}




export default App