# Payload Analysis Tool (POC)

## Overview

Payload Analysis Tool is a local-only proof-of-concept prototype for an internal support tool.

The purpose of the tool is to enable IT support staff to inspect encrypted payloads. A user can paste an encrypted payload, provide a Fernet key, and receive readable decrypted output.

A Fernet key is a URL-safe, base64-encoded 32-byte key used for symmetric authenticated cryptography. To learn more, see the [Fernet Documentation](https://cryptography.io/en/latest/fernet/).

## MVP Scope

The current MVP allows a user to:

- Enter an encrypted payload
- Enter a Fernet key
- Submit the payload to a local FastAPI backend
- Decrypt the payload
- Display the decrypted result in the frontend
- Pretty-print decrypted JSON where possible
- Show user-friendly messages for:
  - empty input
  - invalid payload
  - wrong key
  - backend connection issues

The project also includes a backend `/encrypt` helper endpoint, mainly for generating encrypted test payloads during local development.


Additional future features may include validation checks on the decrypted result, re-encrypting payloads, file upload support, audit logs, or support for different payload formats.

## Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- cryptography / Fernet

### Frontend

- React
- Vite
- JavaScript
- CSS

## How to use

The app is designed to run locally.

To start the project, run the following script from the project root:

``` bash
./scripts/start.sh
```
There are also scripts to start the frontend and backend separately.

Frontend:
``` bash
./scripts/start-frontend.sh
```

Backend:
``` bash
./scripts/start-backend.sh
```

### API Endpoints

#### Health Check

```
GET /health
```
Returns a status response to confirm the backend is running.

#### Decrypt Payload

```
POST /decrypt
```
Accepts an encrypted payload and a Fernet key, then returns the decrypted result.

Example request:
``` json
{
  "encrypted_payload": "xxxxx...",
  "fernet_key": "your-fernet-key"
}
```

Example raw API response:

```json
{
  "success": true,
  "decrypted_res": "{\"order_id\":\"12345\",\"product\":\"Webroot\",\"status\":\"active\"}"
}

```

When displayed in the frontend, valid JSON is formatted as:
``` json 
{
  "order_id": "12345",
  "product": "Webroot",
  "status": "active"
}
```

#### Encrypt Payload
```
POST /encrypt
```
Helper endpoint used to generate encrypted test payloads during local development.

Example request:
``` json
{
  "payload": "test payload",
  "fernet_key": "your-fernet-key"
}
```

Example response:
``` json
{
  "success": true,
  "encrypted_res": "xxxxx..."
}
```

### Generate a Fernet Key

To generate a Fernet key from the backend environment:
``` bash
cd backend
source .venv/bin/activate
python
```
Then in the Python console:
``` python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
print(key.decode("utf-8"))
```
Use the printed key for both `/encrypt` and `/decrypt`.


### Error Handling
The frontend handles:

- Missing encrypted payload
- Missing Fernet key
- Invalid encrypted payload
- Wrong Fernet key
- Backend connection failure

The backend converts known decryption and encryption failures into clear HTTP 400 responses.

### JSON Formatting

If the decrypted result is valid JSON, the frontend attempts to pretty-print it before displaying it.

For example, this decrypted payload:
``` json
{"order_id":"12345","product":"Webroot","status":"active"}
```
is displayed as:
``` json
{
  "order_id": "12345",
  "product": "Webroot",
  "status": "active"
}
```

If the decrypted result is plain text, it is displayed unchanged.

## Future Security Considerations

The current POC keeps the security model deliberately simple.

If this tool were adopted in a production environment, support users should not handle raw decryption keys directly, and long-lived product keys should not be stored or hardcoded inside the local application.

A production version could use contextual information such as product, order ID or customer ID to route the request securely. The local app could send this information, along with the encrypted payload, to a controlled internal API. That service would be responsible for checking user authorisation, selecting the correct key or key version, and performing the sensitive decryption step.

The internal service would likely sit inside a private company network, such as an AWS VPC or Azure VNet, and be accessed through the company VPN or another approved internal access route.

Key material should be managed through a dedicated key management system, such as AWS KMS, Azure Key Vault or HashiCorp Vault.

Audit logging would also be required. Logs should record who used the tool, when it was used, which product and order/customer ID were involved, and whether the action succeeded or failed. Logs should not store raw keys, full decrypted payloads or unnecessary customer data.