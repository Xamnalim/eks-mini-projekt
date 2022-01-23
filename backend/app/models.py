from pydantic import BaseModel
from typing import Optional


class Post(BaseModel):
    content: str
    signature: str
    token: str

class TokenRequest(BaseModel):
    password: str
    amount: Optional[int]
