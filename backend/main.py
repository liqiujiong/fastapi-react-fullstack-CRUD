from fastapi import FastAPI
import config
from core.server import create_app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=config.SERVER_IP,
        port=config.SERVER_PORT,
        reload=config.DEBUG
    )
