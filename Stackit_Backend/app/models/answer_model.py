from pydantic import BaseModel

class Answer(BaseModel):
    question_id: str
    answer_text: str
    votes: int = 0