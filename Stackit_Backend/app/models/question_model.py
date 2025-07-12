from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    title: str
    description: str
    tags: List[str]
    votes: int = 0
    answers: int = 0
    accepted: bool = False
    createdAt: Optional[str] = None
