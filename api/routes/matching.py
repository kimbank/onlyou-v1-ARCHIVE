from fastapi import APIRouter, Depends
from starlette.requests import Request


router = APIRouter(prefix="/matching")


@router.get("/status")
async def get_matching(request: Request):
    request
