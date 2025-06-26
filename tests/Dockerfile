FROM python:3.9-slim

WORKDIR /app

COPY api_tests.py run_tests.sh ./

RUN apt-get update && apt-get install -y default-jre wget unzip && \
    pip install pytest requests allure-pytest && \
    wget https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.tgz && \
    tar -xzf allure-2.27.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN chmod +x run_tests.sh

CMD ["./run_tests.sh"]