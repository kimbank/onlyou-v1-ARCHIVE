from fastapi import APIRouter, Depends

router = APIRouter(prefix="/matching")


@router.get("/", )
async def get_matching():
    return {
        "message": "GET API completed",
    }
