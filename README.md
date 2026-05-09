# Payload Analysis Tool (POC)

## Overview

Payload Analysis Tool is a local-only proof-of-concept internal support tool.

The purpose of the tool is to enable IT support staff to inspect encrypted payloads. A user will be able to paste an encrypted payload, provide a decryption key, and receive readable decrypted output.

## MVP Scope

The MVP will allow a user to:

- Enter an encrypted payload
- Enter a decryption key
- Submit the payload to a local FastAPI backend
- Decrypt the payload
- Display the decrypted output as readable JSON or text

Additional features may include validation checks on the decrypted result, handling invalid input or failed decryption cleanly, re-encrypting payloads, adding file upload support, audit logs, or supporting different payload formats.

## Tech Stack

### Backend

- Python
- FastAPI
- Uvicorn

### Frontend

- React
- JavaScript
- HTML/CSS


