from app.db import db
from bson import ObjectId
import datetime

async def get_all_questions():
    questions_cursor = db.questions.find().sort("createdAt", -1)
    questions = []
    async for question in questions_cursor:
        question["id"] = str(question["_id"])
        del question["_id"]
        questions.append(question)
    return questions

async def create_question(question_data: dict, author: str):
    question_data["author"] = author
    question_data["createdAt"] = datetime.datetime.utcnow().isoformat()
    result = await db.Questions.insert_one(question_data)
    question_data["_id"] = str(result.inserted_id)  # Convert ObjectId to string
    return question_data

async def vote_question(question_id: str, vote: int):
    question = await db.questions.find_one({"_id": ObjectId(question_id)})
    if not question:
        return False
    await db.questions.update_one({"_id": ObjectId(question_id)}, {"$inc": {"votes": vote}})
    return True
