FROM node:18-alpine

RUN apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    openssh-client \
    sshpass \
    && python3 -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --upgrade pip setuptools

ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /app/data && \
    touch /app/data/connections.json && \
    echo "[]" > /app/data/connections.json

EXPOSE 3000
CMD ["npm", "start"]