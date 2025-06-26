import pytest
import requests
import random
import string
import os

BASE_URL = f"http://{os.getenv('BACK_HOST', '79.132.136.198')}:{os.getenv('BACK_PORT', 80)}/api"
API_PREFIX = "/students"
HEADERS = {"Content-Type": "application/json"}

expected_model = {
    "id": int,
    "first_name": str,
    "surname": str,
    "student_group": str,
    "email": str,
    "active": str
}

ALLOWED_ACTIVE_VALUES = ["активный", "отчисленный"]

ACTIVE_MAP = {
    True: "активный",
    False: "отчисленный",
}

def check_student(data):
    for field, expected_type in expected_model.items():
        assert field in data, f"Поле '{field}' отсутствует в объекте"
        assert isinstance(data[field], expected_type), \
            f"Поле '{field}' имеет неверный тип. Ожидается {expected_type}, получено {type(data[field])}"

def generate_student_data():
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return {
        "first_name": "Тест",
        "surname": "Студент",
        "student_group": "М24-Ш04",
        "email": f"test_{random_suffix}@university.edu",
        "active": True
    }

@pytest.fixture
def test_student():
    data = generate_student_data()
    response = requests.post(f"{BASE_URL}{API_PREFIX}/", json=data, headers=HEADERS)
    assert response.status_code == 200
    
    yield response.json()

    requests.delete(f"{BASE_URL}{API_PREFIX}/{response.json()['id']}", headers=HEADERS)

class TestStudentsAPI:

    # ===== GET /students/ =====
    def test_get_all_students_positive(self):
        """Позитивный тест получения всех студентов"""
        response = requests.get(f"{BASE_URL}{API_PREFIX}/", headers=HEADERS)
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        
        for student in response.json():
            check_student(student)
        
    def test_get_all_students_negative(self):
        """Негативный тест - неверный метод"""
        response = requests.put(f"{BASE_URL}{API_PREFIX}/", headers=HEADERS)
        assert response.status_code == 404

    # ===== GET /students/active =====
    def test_get_active_students_positive(self, test_student):
        """Позитивный тест получения активных студентов"""
        response = requests.get(f"{BASE_URL}{API_PREFIX}/active", headers=HEADERS)
        assert response.status_code == 200
        students = response.json()
        for student in students:
            check_student(student)
        assert all(s["active"] == "активный" for s in students)
    
    def test_get_active_students_negative(self):
        """Негативный тест - неверный метод"""
        response = requests.post(f"{BASE_URL}{API_PREFIX}/active", headers=HEADERS)
        assert response.status_code == 404

    # ===== GET /students/{id} =====
    def test_get_student_by_id_positive(self, test_student):
        """Позитивный тест получения студента по ID"""
        response = requests.get(f"{BASE_URL}{API_PREFIX}/{test_student['id']}", headers=HEADERS)
        assert response.status_code == 200
        assert response.json()["id"] == test_student["id"]
        check_student(response.json())
        
    
    def test_get_student_by_id_negative(self):
        """Негативный тест - несуществующий ID"""
        response = requests.get(f"{BASE_URL}{API_PREFIX}/999999", headers=HEADERS)
        assert response.status_code == 400

    # ===== POST /students/ =====
    def test_create_student_positive(self):
        """Позитивный тест создания студента"""
        data = generate_student_data()
        response = requests.post(f"{BASE_URL}{API_PREFIX}/", json=data, headers=HEADERS)
        assert response.status_code == 200
        student = response.json()
        check_student(student)
        assert student["first_name"] == data["first_name"]
        assert student["surname"] == data["surname"]
        assert student["email"] == data["email"]
        assert student["student_group"] == data["student_group"]
        assert student["active"] == ACTIVE_MAP[data["active"]]
        requests.delete(f"{BASE_URL}{API_PREFIX}/{student['id']}", headers=HEADERS)
    
    def test_create_student_negative(self):
        """Негативный тест - невалидные данные"""
        response = requests.post(
            f"{BASE_URL}{API_PREFIX}/", 
            json={"invalid": "data"}, 
            headers=HEADERS
        )
        assert response.status_code == 400

    # ===== DELETE /students/{id} =====
    def test_delete_student_positive(self, test_student):
        """Позитивный тест удаления студента"""
        response = requests.delete(f"{BASE_URL}{API_PREFIX}/{test_student['id']}", headers=HEADERS)
        assert response.status_code == 200

        check_response = requests.get(f"{BASE_URL}{API_PREFIX}/{test_student['id']}", headers=HEADERS)
        assert check_response.status_code == 400
    
    def test_delete_student_negative(self):
        """Негативный тест - удаление несуществующего студента"""
        response = requests.delete(f"{BASE_URL}{API_PREFIX}/999999", headers=HEADERS)
        assert response.status_code == 400