from fastapi import APIRouter, Depends, Response
from starlette.responses import JSONResponse
from api.utils.user_photo import presigned_url

router = APIRouter(prefix="/user")


@router.get('/photo')
async def photo():
    url = await presigned_url()

    return JSONResponse(status_code=200, content=dict(msg=f"success {str(url)}"))