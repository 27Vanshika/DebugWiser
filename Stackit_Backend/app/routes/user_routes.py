from fastapi import APIRouter, HTTPException
from models.user_model import User
from services.user_services import register_user, authenticate_user

router = APIRouter()

@router.post("/register")
async def register(user: User):
    success, message = await register_user(user.username, user.password)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"message": message}

@router.post("/login")
async def login(user: User):
    token = await authenticate_user(user.username, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"access_token": token, "token_type": "bearer"}
