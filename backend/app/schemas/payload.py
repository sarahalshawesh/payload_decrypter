from pydantic import BaseModel


class DecryptPayloadRequest(BaseModel):
    encrypted_payload: str
    fernet_key: str

class EncryptPayloadRequest(BaseModel):
    payload: str
    fernet_key: str

