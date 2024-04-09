FROM postgres:16-alpine

ENV POSTGRES_USER todo

ENV POSTGRES_DB todo

ENV APP_BACKEND_USER backend

COPY init/* /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/*

