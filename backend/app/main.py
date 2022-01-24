import os
import random

from fastapi import Depends, FastAPI, status
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from psycopg2.errors import UniqueViolation
import uvicorn

import database as db
from models import Post, TokenRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = db.get_db_conn()
    conn.autocommit = True
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


@app.get("/tokens")
def get_tokens(token_req: TokenRequest, db_conn: db.connection = Depends(get_db)):
    admin_pass_valid = validate_admin_pass(token_req.password)
    if not admin_pass_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="supplied password is incorrect"
        )

    tokens = db.get_tokens(db_conn.cursor())

    return {"data": tokens}


@app.post("/tokens")
def generate_tokens(token_req: TokenRequest, db_conn: db.connection = Depends(get_db)):
    admin_pass_valid = validate_admin_pass(token_req.password)
    if not admin_pass_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="supplied password is incorrect"
        )

    if token_req.amount is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="amount of tokens to generate not supplied"
        )

    curs = db_conn.cursor()
    tokens = []

    while len(tokens) < token_req.amount:
        token = random.randint(100_000, 999_999)
        
        try:
            new_token = db.insert_token(curs, str(token))
        except UniqueViolation:
            continue
        else:
            tokens.append(new_token)

    return {"data": tokens}

def validate_admin_pass(password: str) -> bool:
    return password == os.getenv("ADMIN_PASS")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=(int(os.getenv("APP_PORT") or 8000)))