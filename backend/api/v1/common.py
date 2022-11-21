from fastapi import APIRouter, File
from schemas.response import resp
import config
from utils.tool_func import get_random_filename, get_random_str
from common.logger import logger

router = APIRouter()

@router.post("/upload_wav")
async def create_file(file: bytes = File(...)):
    h = get_random_str()
    try:
        path = "{}/{}.wav".format(config.STATIC_DIR,h)
        f = open(path, 'wb')
        f.write(file)
        return resp.ok(data=path)
    except Exception:
        logger.error("写入错误")
        return resp.fail(resp.BusinessError)
    finally:
        f.close()