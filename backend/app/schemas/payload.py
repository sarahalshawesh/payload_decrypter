from pydantic import BaseModel


class DecryptPayloadRequest(BaseModel):
    encrypted_payload: str
    decryption_key: str

class EncryptPayloadRequest(BaseModel):
    decrypted_payload: str
    encryption_key: str