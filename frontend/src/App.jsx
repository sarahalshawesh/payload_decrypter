import { useState } from 'react'
import './App.css'

function App() {
  const [fernetKey, setFernetKey] = useState('');
  const [encryptedPayload, setEncryptedPayload] = useState('');
  const [decryptedPayload, setDecryptedPayload] = useState('');

  async function sendRequest() {  
    const formData = new FormData();
    formData.append("encrypted_payload", encryptedPayload);
    formData.append("fernet_key", fernetKey);
    try {
      const res = await fetch("http://127.0.0.1:8000/decrypt", {
        body: formData, 
        method: "POST"});
    }
    catch (err) {
      console.log(err)
    }
  }

  
    return (
      <main>
        <h1>Payload Decryption Tool</h1>
        <form>
          <label>Payload to decrypt</label>
          <br></br>
          <input 
            type="text"
            onChange={(e) => setDecryptedPayload(e.target.value)}>
          </input>
          <br></br>
          <label>Key</label>
          <br></br>
          <input
            type="text"
            onChange={(e) => setFernetKey(e.target.value)}>
          </input>
          <br></br>
          <button
            onClick={(sendRequest)}>
            Run
          </button>
        </form>
      </main>
    )
}




export default App