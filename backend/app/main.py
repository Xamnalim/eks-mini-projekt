import os
import time

import psycopg2
from fastapi import FastAPI, status
from fastapi.exceptions import HTTPException
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel

app = FastAPI()

class Post(BaseModel):
    content: str
    signature: str
    token: str


# Database connection
while True:
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            cursor_factory=RealDictCursor,
        )
        cursor = conn.cursor()
        print("Database connection was successfull!")
        break
    except Exception as error:
        print("Connection to database failed!\n", error)
        time.sleep(3)


@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/posts")
def get_posts():
    cursor.execute(
    """
    SELECT * FROM post
    """,
    )
    posts = cursor.fetchall()

    return {"data": posts}


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_post(post: Post):      
    token_valid = check_token(post.token)
    if not token_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"token: '{post.token}' is invalid"
        )

    cursor.execute(
    """
    INSERT INTO post (content, signature)
    VALUES (%s, %s)
    RETURNING *
    """, 
    (post.content, post.signature),
    )
    new_post = cursor.fetchone()
    conn.commit()

    delete_token(post.token)

    return {"data": new_post}


@app.get("/posts/{id}")
def get_post(id: int):
    cursor.execute(
    """
    SELECT * FROM post WHERE id=%s
    """,
    (str(id),),
    )

    post = cursor.fetchone()

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )

    return {"post_detail": post}

@app.get("tokens")


def check_token(token: str) -> bool:
    cursor.execute(
    """
    SELECT * FROM token WHERE token=%s
    """,
    (token,),
    )
    token_db = cursor.fetchone()
    
    return token_db is not None

def delete_token(token: str):
    cursor.execute(
    """
    DELETE FROM token WHERE token=%s
    """,
    (token,),
    )
