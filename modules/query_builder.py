import textwrap

class QueryBuilder:
    def __init__(self):
        self.values = []

    def build_query(self, parameters: dict) -> str:
        string = textwrap.dedent("""
                                SELECT
                                 class_section_number,
                                 class.crs_code,
                                 crs_credit,
                                 subject_name,
                                 term,
                                 class_instructor,
                                 class_time,
                                 class_days
                                FROM
                                 class
                                FULL JOIN course
                                 on class.crs_code = course.crs_code
                                WHERE
                                 class_time <> 'TBA'
        """)
        if "term" in parameters:
            string += "AND term = %s "
            self.values.append(parameters['term'])
        if "major" in parameters:
            string += "AND subject_name = %s "
            # string += f'AND subject_name NOT LIKE 5%' <- trying to remove graduate classes
            self.values.append(parameters['major'])
        if "hard_constraints" in parameters and "unavailable_times" in parameters["hard_constraints"]:
            day = parameters['hard_constraints']['unavailable_times'][0]['day']
            day = f'{day}%'
            string += "AND class_days NOT LIKE %s "
            self.values.append(day)
        if "preferences" in parameters and "instructor" in parameters["preferences"]:
            string += "AND class_instructor = %s "
            self.values.append(parameters['preferences']['instructor'])

        return string
    
    def curriculum_query(self, parameter):
        string = textwrap.dedent("""
                                SELECT
                                 class_section_number,
                                 class.crs_code,
                                 crs_name,
                                 crs_credit,
                                 subject_name,
                                 term,
                                 class_instructor,
                                 class_time,
                                 class_days
                                FROM
                                 class
                                FULL JOIN course
                                 on class.crs_code = course.crs_code
                                WHERE
                                 class_time <> 'TBA'
        """)
        if "required_courses" in parameter and "electives" in parameter:
            string += "AND ("
            first_requirement = parameter["required_courses"][0]
            string += f"\nclass.crs_code = '{first_requirement}' "

            for rc in parameter["required_courses"][1:]:
                string += f"\nOR class.crs_code = '{rc}' "
            for e in parameter["electives"]:
                string += f"\nOR class.crs_code LIKE '{e}%' "
            
            string += ");"
            return string
        if "required_courses" in parameter:
            string += "AND ("
            first_requirement = parameter["required_courses"][0]
            string += f"\nclass.crs_code = '{first_requirement}' "

            for rc in parameter["required_courses"][1:]:
                string += f"\nOR class.crs_code = '{rc}' "
            string += ")"
        if "electives" in parameter:
            string += "AND ("
            elective1 = parameter["electives"][0]
            string += f"\nclass.crs_code = '{first_requirement}' "

            for e in parameter["electives"][1:]:
                string += f"\nOR class.crs_code = '{e}%' "
            string += ")"
        return string
    
    def clear_values(self):
        self.values.clear()
        if len(self.values) == 0:
            return True
        return False
    
