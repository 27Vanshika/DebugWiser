from fastapi import APIRouter, HTTPException, Request
from app.models.question_model import Question
from app.services.question_service import get_all_questions, create_question, vote_question

router = APIRouter()

