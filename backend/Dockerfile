FROM python:3.8

VOLUME /app
WORKDIR /app

COPY requirements.txt .
COPY . .

RUN pip install -r requirements.txt
RUN pip install uwsgi

CMD uwsgi \
	--wsgi-file backend/wsgi.py \
	--http :8000
