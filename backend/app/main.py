from fastapi import FastAPI
from app.routers.decrypt import router as decrypt_router
from app.routers.encrypt import router as encrypt_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Payload Analysis Tool")



origins = [
    "http://localhost", 
    "http://localhost:5173", 
    "http://127.0.0.1:5173", 
]

app.add_middleware(CORSMiddleware, allow_origins = origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(decrypt_router)
app.include_router(encrypt_router)