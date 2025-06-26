FROM python:3.9-slim

WORKDIR /app

COPY api_tests.py ./

RUN pip install pytest requests
RUN apt-get update && apt-get install -y default-jre
RUN pip install allure-pytest

CMD ["pytest", "test_students_api.py", "-v", "--alluredir=./allure-results"] && \
    allure serve ./allure-results
