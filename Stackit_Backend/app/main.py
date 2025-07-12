from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, question_routes
from app.middlewares.jwt_middleware import JWTAuthMiddleware

app = FastAPI()

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for specific frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Add JWT middleware
# app.add_middleware(JWTAuthMiddleware)

# Include routers
app.include_router(user_routes.router, prefix="/api")
app.include_router(question_routes.router, prefix="/api")
