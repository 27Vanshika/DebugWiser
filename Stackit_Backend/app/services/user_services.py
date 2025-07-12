from db import db
from utils.auth import get_password_hash, verify_password, create_access_token

async def register_user(username: str, password: str):
    existing_user = await db.users.find_one({"username": username})
    if existing_user:
        return False, "Username already exists"

    hashed_pw = get_password_hash(password)
    await db.users.insert_one({"username": username, "password": hashed_pw})
    return True, "User registered successfully"

async def authenticate_user(username: str, password: str):
    db_user = await db.users.find_one({"username": username})
    if not db_user or not verify_password(password, db_user["password"]):
        return None
    token = create_access_token({"sub": db_user["username"]})
    return token
