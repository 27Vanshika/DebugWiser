from fastapi import HTTPException
from app.models.answer_model import Answer
from app.db import db
from datetime import datetime

async def post_answer(data: Answer, user_id: str):
    try:
        # Check if the question exists
        question = await db.Questions.find_one({"question_id": data.question_id})
        if not question:
            raise HTTPException(status_code=404, detail="Question not found")

        # Prepare answer data
        answer_data = {
            "question_id": data.question_id,
            "answer_text": data.answer_text,
            "answered_by": user_id,
            "votes": data.votes,
            "createdAt": datetime.utcnow().isoformat()
        }

        # Insert the answer
        await db.Answers.insert_one(answer_data)

        # Increment the answer count in the corresponding question
        await db.Questions.update_one(
            {"question_id": data.question_id},
            {"$inc": {"answers": 1}}
        )

        return {"message": "Answer posted successfully"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to post answer")


async def get_answers_by_question_id(question_id: str):
    try:
        answers = await db.Answers.find(
            {"question_id": question_id},
            {"_id": 0}
        ).to_list(length=None)
        return answers
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch answers")