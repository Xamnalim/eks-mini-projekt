FROM python:3.9
LABEL org.opencontainers.image.authors="mlapinski98@gmail.com"
LABEL description="Backend aplikacji projektowej realizowanej \
na potrzeby przedmiotu Aplikacje w architekturze klient-serwer."
WORKDIR /code
COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
RUN rm ./requirements.txt
COPY ./app /code/app
CMD [ "python", "app/main.py" ]
