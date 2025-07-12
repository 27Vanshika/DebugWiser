from app.models.question_model import Question
from app.services.question_service import create_question, get_all_questions
from app.utils.auth import decode_token
from fastapi import APIRouter, HTTPException, Request
from app.models import user_model 
from app.services.user_services import register_user, authenticate_user

router = APIRouter()

@router.post("/register")
async def register(user: user_model.User):
    success, message = await register_user(
        user.username,
        user.email,
        user.contact_number,
        user.name,
        user.password
    )
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"message": message}

@router.post("/login")
async def login(user: user_model.LoginUser):
    token = await authenticate_user(user.email, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": token, "token_type": "bearer"}

@router.post("/questions")
async def post_question(data: Question, request: Request):
    user_info = request.state.user  # Set by JWT middleware
    return await create_question(data.model_dump(), user_info)

@router.get("/Allquestions")
async def fetch_questions():
    return await get_all_questions()