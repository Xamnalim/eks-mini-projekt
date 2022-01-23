import os
import time

import psycopg2
from fastapi import FastAPI
from psycopg2.extras import RealDictCursor

app = FastAPI()


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
