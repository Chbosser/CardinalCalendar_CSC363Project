import pytest
from modules.parameter_executer import QueryBuilder
from modules.parameter_executer import ExecuteParameter

additional_parameters = [
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
    parameter = ExecuteParameter()
    string = parameter.parse_json(additional_parameters[0])
    results = query_builder.test2_query(string)
    print(results)
    assert isinstance(results, list), "result is list"