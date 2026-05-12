import { useState } from 'react'
import './App.css'

function App() {
  //stores user entered key
  const [fernetKey, setFernetKey] = useState('');
  // stores user entered encrypted payload
  const [encryptedPayload, setEncryptedPayload] = useState('');
  // stores decrypted payload returned from the backend
  const [decryptedPayload, setDecryptedPayload] = useState('');
  // stores any errors to display to the user
  const [requestError, setRequestError] = useState('');

  // validates the users input before sending to the backend
  function validateForm() {
    if (!encryptedPayload.trim()) {
      return 'Please enter a payload.'
    }
    if (!fernetKey.trim()) {
      return 'Please enter a decryption key.'
    }
    // if there are no errors, returns an empty string
    return ''
  };
  
  // sends encrypted payload and key to the backend
  async function sendRequest() {  
    // clears errors and decrypted payload from previous calls
    setRequestError('');
    setDecryptedPayload('');
    // stores any errors from validating the users input or empty string if there is none
    const validationError = validateForm();

    // Returns if required fields are missing from the users input
    if (validationError) {
      setRequestError(validationError);
      return
    };
    // stores the payload and key in the way expected by the backend
    const data = {"encrypted_payload": encryptedPayload, "fernet_key": fernetKey};
    // sends POST request to the backend
    try {
      const res = await fetch("http://127.0.0.1:8000/decrypt", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
        method: "POST"});
        
      if (res.ok) {
        // Transforms backend JSON response into JS object
        const parsedRes = await res.json();
        // Formats the JS object if it's valid JSON
        const formattedPayload = formatJson(parsedRes)
        setDecryptedPayload(formattedPayload)
      } else {
        // Transforms error into JS object
        const parsedRes = await res.json();
        console.log(res.status);
        console.log(parsedRes.detail);
        // Displays to the user the error message or a fallback error message
        setRequestError(parsedRes.detail || "Unable to decrypt payload.");
      }
    }
    catch (err) {
      // Error handling for issues connecting to the backend
      console.log(err);
      console.log("Unable to connect to backend. Check the API is running.");
      setRequestError('Unable to connect to backend. Check the API is running.')
    }
  };

  // Pretty prints decrypted JSON or returns plain text back
  function formatJson(parsedRes) { 
    try {
      // If decrypted_res string contains valid JSON, its turned into a JS object.
      const parsedJson = JSON.parse(parsedRes.decrypted_res)
      // Transforms JS Object into JSON with indentation
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      return formattedJson;
    } catch {
      // If it fails, the decrypted text is not JSON so it is returned
      return parsedRes.decrypted_res
    }
  }

    return (
      <main>
        <h1>Payload Decryption Tool</h1>

        <form>
          <label 
            htmlFor="encrypted-payload">Payload to decrypt</label>
          <br />

          <textarea 
            id="encrypted-payload"
            onChange={(e) => setEncryptedPayload(e.target.value)}
          />
          <br />

          <label htmlFor="decryption-key">Key</label>
          <br />

          <input
            id="decryption-key"
            type="text"
            autoComplete="off"
            onChange={(e) => setFernetKey(e.target.value)}
          />
          <br />

          <button
            type="button"
            onClick={(sendRequest)}>
            Decrypt
          </button>
        </form>

        <h3>Decrypted Payload</h3>
        
        {decryptedPayload && <pre>{decryptedPayload}</pre>}
        {requestError && <pre>{requestError}</pre>}
      </main>
    )
}




export default App