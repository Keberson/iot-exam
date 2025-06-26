FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-jre \
    wget \
    unzip \
    curl && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.tgz && \
    tar -xzf allure-2.27.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure && \
    rm allure-2.27.0.tgz

RUN pip install pytest requests allure-pytest

RUN curl -o /usr/local/bin/wait-for-it.sh \
    https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

COPY api_tests.py run_tests.sh ./
RUN chmod +x run_tests.sh

CMD ["sh", "-c", "wait-for-it.sh ${BACKEND_HOST:-backend}:${BACKEND_PORT:-5000} --timeout=30 --strict -- ./run_tests.sh"]