FROM python:3.10-slim as base

RUN apt-get update \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/requirements/chat.txt ./requirements/chat.txt
ENV PYTHONPATH=/app

RUN pip install -U pip \
    && pip install -r requirements/chat.txt \
    && rm requirements/chat.txt

FROM base as rest

COPY backend/fast_api ./
EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--access-log"]

FROM base as grpc

COPY backend/grpc_api/src ./
EXPOSE 50051

CMD ["python", "main.py"]
