#!/bin/bash
pytest api_tests.py -v --alluredir=./allure-results
allure serve ./allure-results