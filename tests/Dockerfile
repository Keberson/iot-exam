FROM python:3.9-slim

WORKDIR /app

COPY api_tests.py ./

RUN pip install pytest requests
RUN apt-get update && apt-get install -y default-jre
RUN pip install allure-pytest

COPY api_tests.py run_tests.sh ./
RUN chmod +x run_tests.sh

CMD ["./run_tests.sh"]
