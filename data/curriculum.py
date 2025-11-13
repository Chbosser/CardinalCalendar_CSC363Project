from modules.query_builder import QueryBuilder
from modules.module1 import Parameter
# import sys
# print(sys.path)
cs_curriculum = [
"""
{
    "year": "1",
    "semeseter": "Spring 2026",
    "required_courses": [
        "MATH122", "CSC210", "CSC223", "PHIL202", "TRS201"
        ]
}
""",
"""
{
    "year": "2",
    "semeseter": "Spring 2026",
    "required_courses": [
        "CSC323", "CSC326", "CSC327", "CSC322"
        ],
    "electives": [
        "Science", "Liberal Art"
        ]
}
""",
"""
{
    "year": "3",
    "semeseter": "Spring 2026",
    "required_courses": [
        "CSC306", "CSC409"
    ],
    "electives": [
        "MATH", "CSC", "LS"
    ]
}
""",
"""
{
    "year": "4",
    "semeseter": "Spring 2026",
    "required_courses": [
        "CSC442", "CSC406"
        ],
    "electives": [
        "MATH", "CSC", "CSC"
        ]
}
"""
]
