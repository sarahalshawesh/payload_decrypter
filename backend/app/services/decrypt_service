from cryptography.fernet import Fernet

def decrypt_payload(payload, key):
    # convert str to bytes before decryption
    payload_bytes = payload.encode('utf-8')
    key_bytes = key.encode('utf-8')
    try:
        f = Fernet(key_bytes)
        decrypted_bytes = f.decrypt(payload_bytes)
        # convert bytes to str before return
        decrypted_payload = decrypted_bytes.decode('utf-8')
        return decrypted_payload

    except Exception:
        raise ValueError("Unable to decrypt payload. Check the payload and key.")