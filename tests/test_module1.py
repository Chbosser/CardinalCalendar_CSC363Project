import pytest
from modules.module1 import Parameter
import json

test_parameters = [
"""
{
    "term": "Spring 2026",
    "major": "Computer Science",
    "completed_courses": ["MATH101", "CSC123"],
    "hard_constraints": {
        "no_class_before": "11:00",
        "unavailable_times": [
        {"day": "Mon", "start": "1:00PM", "end": "3:00PM"}
        ]
    },
    "soft_constraints": {
        "prefer_mw": true,
        "avoid_friday": true
    },
    "preferences": {
        "instructor": "Rizk, D.",
        "campus": "Main"
    }
}
""",
"""
{
    "term": "Spring 2026",
    "major": "Computer Science",
    "hard_constraints": {
        "unavailable_times": [
        {"day": "Tue"}
        ]
    },
    "preferences": {
        "instructor": "Rizk, D."
    }
}
""",
"""
{
    "term": "Spring 2026",
    "major": "Civil & Environmental Engineer",
    "hard_constraints": {
        "unavailable_times": [
        {"day": "Mon"}
        ]
    },
    "preferences": {
        "instructor": "McHugh, G."
    }
}
""",

]

@pytest.fixture
def parameters():
    return Parameter()

def test_is_json(parameters):
    assert parameters.is_json_to_dict(parameters.jsonify(test_parameters[0])) == True

@pytest.mark.parametrize("each_test", test_parameters, ids=['CSC1', 'CSC2', 'CEE'])
def test_get_json(parameters, each_test):
    result = parameters.get_json(parameters.jsonify(each_test))
    parsed = json.loads(result)
    if len(parsed) != 0:
        #print(result)
        assert isinstance(parsed, list)
    else:
        print('EMPTY')

