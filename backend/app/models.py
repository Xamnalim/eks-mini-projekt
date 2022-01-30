from pydantic import BaseModel, Field, constr
from typing import Optional


class Post(BaseModel):
    content: str
    signature: constr(max_length=64)
    token: str

class TokenRequest(BaseModel):
    password: str
    amount: Optional[int] = Field(ge=0, le=20)
