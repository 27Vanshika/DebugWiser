from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    contact_number: int 
    name: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str    

class Answer(BaseModel):
    id: str
    content: str
    created_at: str
    updated_at: str
    votes_count: int = 0
    is_accepted: bool = False
    author: User
    question_id: str
    summary: Optional[str] = None  # For AI summaries    

class VoteRequest(BaseModel):
    value:int   # should be +1 for upvote, -1 for downvote

class Question(BaseModel):
    title: str
    description: str
    tags: List[str]
    