from pydantic import BaseModel, Field
from typing import Optional


class Post(BaseModel):
    content: str
    signature: str
    token: str

class TokenRequest(BaseModel):
    password: str
    amount: Optional[int] = Field(..., gt=0, le=20)
