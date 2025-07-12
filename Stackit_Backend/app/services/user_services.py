import datetime
from http.client import HTTPException
from app.db import db
from app.models.question_model import Question
from app.models.user_model import Answer, User
from app.utils.auth import get_password_hash, verify_password, create_access_token

async def register_user(username: str, email: str, contact_number: str, name: str, password: str):
    # Check if username or email already exists
    existing_user = await db.Users.find_one({"$or": [{"username": username}, {"email": email}]})
    if existing_user:
        return False, "Username or email already exists"

    # Find the latest user_id
    last_user = await db.Users.find_one(
        {"user_id": {"$regex": "^USR"}}, 
        sort=[("user_id", -1)]
    )

    if last_user and "user_id" in last_user:
        # Extract numeric part, e.g., USR005 => 5
        last_number = int(last_user["user_id"][3:])
        new_number = last_number + 1
    else:
        new_number = 1

    new_user_id = f"USR{new_number:03d}"

    hashed_pw = get_password_hash(password)

    new_user = {
        "user_id": new_user_id,
        "username": username,
        "email": email,
        "contact_number": contact_number,
        "name": name,
        "password": hashed_pw
    }

    await db.Users.insert_one(new_user)
    return True, f"User registered successfully with user_id: {new_user_id}"

async def authenticate_user(email: str, password: str):
    db_user = await db.Users.find_one({"email": email})
    if not db_user or not verify_password(password, db_user["password"]):
        return None
    token = create_access_token({"sub": db_user["user_id"]})
    return token


async def get_next_question_id():
    counter = await db.Counters.find_one_and_update(
        {"_id": "question_id"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True
    )
    return f"Q{str(counter['seq']).zfill(3)}"  # → Q001, Q002...


async def create_question(data: Question, user_info: str):
    try:
        user_id = user_info

        # Optional: Verify user exists
        user = await db.Users.find_one({"user_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # ✅ Get next question ID
        question_id = await get_next_question_id()

        question_data = data.dict()
        question_data["question_id"] = question_id
        question_data["created_by"] = user_id
        question_data["votes"] = 0
        question_data["answers"] = 0
        question_data["accepted"] = False
        question_data["createdAt"] = datetime.utcnow().isoformat()

        await db.Questions.insert_one(question_data)

        return {"message": "Question posted successfully", "question_id": question_id}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to post question")
    


async def get_all_questions():
    try:
        questions = await db.Questions.find({}, {"_id": 0}).to_list(length=None)
        return questions
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch questions")
 
   
    

