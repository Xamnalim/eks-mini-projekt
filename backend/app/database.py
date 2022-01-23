import os

import psycopg2
from psycopg2.extensions import connection, cursor
from psycopg2.extras import RealDictCursor


def get_db_conn() -> connection:
    return  psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            cursor_factory=RealDictCursor,
        )

# POST

def get_posts(curs: cursor) -> dict:
    with curs:
            curs.execute(
            """
            SELECT * FROM post
            """,
            )
            return curs.fetchall()

def create_post(curs: cursor, content: str, signature: str) -> dict:
    with curs:
        curs.execute(
        """
        INSERT INTO post (content, signature)
        VALUES (%s, %s)
        RETURNING *
        """, 
        (content, signature),
        )
        post = curs.fetchone()
    
    return post

def get_post(curs: cursor, id: int) -> dict:
    with curs:
        curs.execute(
        """
        SELECT * FROM post WHERE id=%s
        """,
        (str(id),),
        )
        post = curs.fetchone()

    return post


# TOKEN

def get_tokens(curs: cursor) -> dict:
    with curs:
        curs.execute(
        """
        SELECT * FROM token
        """,
        )
        tokens = curs.fetchall()

    return tokens

def insert_token(curs: cursor, token: str) -> dict:
    curs.execute(
    """
    INSERT INTO token (token)
    VALUES (%s)
    RETURNING *
    """,
    (token,),
    )
    new_token = curs.fetchone()

    return new_token

def check_token(curs: cursor, token: str) -> bool:
    with curs:
        curs.execute(
        """
        SELECT * FROM token WHERE token=%s
        """,
        (token,),
        )
        token_db = curs.fetchone()
    
    return token_db is not None

def delete_token(curs: cursor, token: str):
    with curs:
        curs.execute(
        """
        DELETE FROM token WHERE token=%s
        """,
        (token,),
        )
