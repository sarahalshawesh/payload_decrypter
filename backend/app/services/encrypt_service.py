from cryptography.fernet import Fernet


def encrypt_payload(payload, key):
    # convert str to bytes before encryption
    payload_bytes = payload.encode('utf-8')
    key_bytes = key.encode('utf-8')
    try:
        f = Fernet(key_bytes)
        encrypted_bytes = f.encrypt(payload_bytes)
        # convert bytes to str before return
        encrypted_payload = encrypted_bytes.decode('utf-8')
        return encrypted_payload

    except Exception:
        raise ValueError("Unable to encrypt payload. Check the payload and key.")