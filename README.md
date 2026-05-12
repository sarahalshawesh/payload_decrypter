# Payload Analysis Tool (POC)

## Overview

Payload Analysis Tool is a local-only proof-of-concept prototype for an internal support tool.

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


## Future Security Considerations

The current POC keeps the security model deliberately simple.

If this tool were adopted in a production environment, support users should not handle raw decryption keys directly, and long-lived product keys should not be stored or hardcoded inside the local application.

A production version could use contextual information such as product, order ID or customer ID to route the request securely. The local app could send this information, along with the encrypted payload, to a controlled internal API. That service would be responsible for checking user authorisation, selecting the correct key or key version, and performing the sensitive decryption step.

The internal service would likely sit inside a private company network, such as an AWS VPC or Azure VNet, and be accessed through the company VPN or another approved internal access route.

Key material should be managed through a dedicated key management system, such as AWS KMS, Azure Key Vault or HashiCorp Vault.

Audit logging would also be required. Logs should record who used the tool, when it was used, which product and order/customer ID were involved, and whether the action succeeded or failed. Logs should not store raw keys, full decrypted payloads or unnecessary customer data.