from fastapi import FastAPI
from routes import user_routes, question_routes
from middlewares.jwt_middleware import JWTAuthMiddleware

app = FastAPI()

# Add JWT middleware
app.add_middleware(JWTAuthMiddleware)

# Include routers
app.include_router(user_routes.router, prefix="/api")
app.include_router(question_routes.router, prefix="/api")
