from typing import Optional

from fastapi import Depends, FastAPI, status
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from . import database as db

app = FastAPI()

class Post(BaseModel):
    content: str
    signature: str
    token: str

def get_db():
    conn = db.get_db_conn()
    try:
        yield conn
    finally:
        conn.close()
    


@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/posts")
def get_posts(db_conn: db.connection = Depends(get_db)):
    posts = db.get_posts(db_conn.cursor())

    return {"data": posts}


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_post(post: Post, db_conn: db.connection = Depends(get_db)):
    curs = db_conn.cursor()

    token_valid = db.check_token(curs, post.token)
    if not token_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"invalid token"
        )

    new_post = db.create_post(curs, post.content, post.signature)
    db.delete_token(curs, post.token)

    return {"data": new_post}


@app.get("/posts/{id}")
def get_post(id: int, db_conn: db.connection = Depends(get_db)):
    post = db.get_post(db_conn.cursor(), id)

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )

    return {"post_detail": post}
