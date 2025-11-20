import pytest
from modules.module1 import Parameter
import json
from data.curriculum import cs_curriculum

parametersv1 = [
# ID: CSC1
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
# ID: CSC2
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
# ID: CEE
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
# ID: BE
"""
{
    "term": "Spring 2026",
    "major": "Biomedical Engineering",
    "hard_constraints": {
        "unavailable_times": [
        {"day": "Mon"}
        ]
    }
}
""",
# ID: BE2
"""
{
    "term": "Spring 2026",
    "major": "Biomedical Engineering",
    "hard_constraints": {
        "unavailable_times": [
        {"day": "Tue"}
        ]
    }
}
""",
# ID: EE
"""
{
    "term": "Spring 2026",
    "major": "Electrical Engineering",
    "hard_constraints": {
        "unavailable_times": [
        {"day": "Fri"}
        ]
    }
}
"""
]

parametersv2 = [
"""
{
    "term": "Spring 2026",
    "major": "Computer Science",
    "required_courses": ["CSC306", "CSC409"],
    "electives": ["MATH", "CSC"],
    "hard_constraints": {
        "unavailable_days": ["Mon", "Fri"],
        "no_class_after": "4PM"
    }
}
""",
"""
{
    "term": "Spring 2026",
    "major": "Electrical Engineering",
    "required_courses": ["EE442", "EE461"],
    "electives": ["EE"],
    "hard_constraints": {
        "unavailable_days": ["Fri"],
        "no_class_after": "6PM"
    }
}
"""
]

@pytest.fixture
def parameters():
    return Parameter()

# def test_is_json(parameters):
#     assert parameters.is_json_to_dict(parameters.parse_json(parametersv1[0])) == True

# @pytest.mark.parametrize("each_test", parametersv1, ids=['CSC1', 'CSC2', 'CEE', 'BE', 'BE2', 'EE'])
# def test_execute_parametersv1(parameters, each_test):

#     json_string = parameters.parse_json(each_test)
#     result = parameters.execute_parametersv1(json_string)
#     parsed = json.loads(result) # converts json string into python dict/list

#     if len(parsed) != 0:
#         print(result)
#         pass
#     else:
#         print('EMPTY')

#     assert isinstance(parsed, list)
#     assert isinstance(result, str)

# @pytest.mark.parametrize("each_test", cs_curriculum, ids = ['1', '2', '3', '4'])
# def test_cs_curriculum(parameters, each_test):
#     result = parameters.execute_cs_curriculum(parameters.parse_json(each_test))
#     parsed = json.loads(result)

#     if len(parsed) != 0:
#         print(result)
#         pass
#     else:
#         print('EMPTY')

#     assert isinstance(parsed, list)

def test_execute_parametersv2(parameters, id = 'parametersv2'):
    result = parameters.execute_parametersv2(parameters.parse_json(parametersv2[1]))
    for query in result:
        print(query)
        assert isinstance(query, str)

    assert isinstance(result, list)
