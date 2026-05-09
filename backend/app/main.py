from fastapi import FastAPI
from app.routers.decrypt import router as decrypt_router
from app.routers.encrypt import router as encrypt_router

app = FastAPI(title="Payload Analysis Tool")


@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(decrypt_router)
app.include_router(encrypt_router)