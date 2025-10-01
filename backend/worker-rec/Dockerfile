FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "worker.py"]
Arquivo backend/worker-rec/requirements.txt:

pika
psycopg2-binary
