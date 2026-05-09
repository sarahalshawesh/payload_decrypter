from fastapi import FastAPI

app = FastAPI(title="Payload Analysis Tool")


@app.get("/health")
def health_check():
    return {"status": "ok"}