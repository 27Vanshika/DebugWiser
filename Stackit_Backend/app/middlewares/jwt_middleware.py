from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from utils.auth import decode_token

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        bypass_routes = ["/api/login", "/api/register", "/docs", "/openapi.json", "/redoc"]
        if any(request.url.path.startswith(route) for route in bypass_routes):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

        token = auth_header.split(" ")[1]
        payload = decode_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        request.state.user = payload["sub"]
        return await call_next(request)
