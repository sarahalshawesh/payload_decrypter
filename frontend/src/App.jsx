import { useState } from 'react'
import './App.css'

function App() {
  const [fernetKey, setFernetKey] = useState('');
  const [encryptedPayload, setEncryptedPayload] = useState('');
  const [decryptedPayload, setDecryptedPayload] = useState('');
  const [requestError, setRequestError] = useState('');

 
  async function sendRequest() {  
    setRequestError('')
    setDecryptedPayload('')
    const data = {"encrypted_payload": encryptedPayload, "fernet_key": fernetKey}
    try {
      const res = await fetch("http://127.0.0.1:8000/decrypt", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
        method: "POST"})
        const parsedRes = await res.json()
      if (res.ok) {
        setDecryptedPayload(parsedRes.decrypted_res)
      } else {
        console.log(res.status)
        console.log(parsedRes.detail)
        setRequestError(parsedRes.detail)
      }
    }
    catch (err) {
      console.log(err)
      console.log("Unable to connect to backend. Check the API is running.")
    }
  }

  
    return (
      <main>
        <h1>Payload Decryption Tool</h1>
        <form>
          <label 
            htmlFor="encrypted-payload">Payload to decrypt</label>
          <br></br>
          <textarea 
            id="encrypted-payload"
            onChange={(e) => setEncryptedPayload(e.target.value)}>
          </textarea>
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
            type="button"
            onClick={(sendRequest)}>
            Run
          </button>
        </form>
        <h3>Decrypted Payload</h3>
        {decryptedPayload && <pre>{decryptedPayload}</pre>}
        {requestError && <pre>{requestError}</pre>}
      </main>
    )
}




export default App