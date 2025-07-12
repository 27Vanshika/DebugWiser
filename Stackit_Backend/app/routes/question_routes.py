from fastapi import APIRouter, HTTPException, Request
from models.question_model import Question
from services.question_service import get_all_questions, create_question, vote_question

router = APIRouter()

@router.get("/questions")
async def get_questions():
    return await get_all_questions()

@router.post("/questions")
async def create_new_question(question: Question, request: Request):
    author = request.state.user
    question_data = question.dict()
    new_question = await create_question(question_data, author)
    return new_question

@router.put("/questions/{question_id}/vote")
async def vote(question_id: str, vote: int):
    success = await vote_question(question_id, vote)
    if not success:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"message": "Vote updated"}
