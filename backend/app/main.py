from fastapi import FastAPI
from app.routers.decrypt import router as decrypt_router

app = FastAPI(title="Payload Analysis Tool")


@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(decrypt_router)