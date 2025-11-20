import pytest
from modules.module1 import QueryBuilder
from modules.module1 import Parameter
import json
from data.curriculum import cs_curriculum

more_test_parameters = [
"""
{
    "term": "Spring 2026",
    "major": "Computer Science",
    "required_courses": ["CSC306", "CSC409"],
    "electives": ["MATH", "CSC"],
    "hard_constraints": {
        "unavailable_days": ["Fri"],
        "no_class_after": ["5%PM", "6%PM", "7%PM", "8%PM"]
    }
}
"""
]

@pytest.fixture
def query_builder():
    return QueryBuilder()

def test_test2_query(query_builder):
    parameter = Parameter()
    string = parameter.parse_json(more_test_parameters[0])
    results = query_builder.test2_query(string)
    print(results)
    assert isinstance(results, list), "result is list"