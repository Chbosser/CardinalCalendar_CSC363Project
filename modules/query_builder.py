import textwrap

class QueryBuilder:
    def __init__(self):
        self.values = []

    def build_sqlv1(self, parameters: dict) -> str:
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
    
    def build_curriculum_sql(self, parameter):
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
    
    def build_sqlv2(self, parameter: dict) -> list:
        queries = []
        string = self.base_string()
        if "required_courses" in parameter:
            string += "AND ("
            first_requirement = parameter["required_courses"][0]
            string += f"\nclass.crs_code = '{first_requirement}' "

            for rc in parameter["required_courses"][1:]:
                string += f"\nOR class.crs_code = '{rc}' "
            string += ")"
            queries.append(string)

        if parameter['electives'] and parameter['hard_constraints']:
            string = self.base_string()

        if "electives" in parameter:
            if parameter['electives']:
                string += "AND ("
                for count, e in enumerate(parameter["electives"]):
                    if count == 0:
                        string += f"\nclass.crs_code LIKE '{e}%' "
                    else:
                        string += f"\nOR class.crs_code LIKE '{e}%' "
                string += ")"
        if "hard_constraints" in parameter and "unavailable_days" in parameter["hard_constraints"]:
            if parameter['hard_constraints']['unavailable_days']:
                string += "AND ("
                for count, ua in enumerate(parameter["hard_constraints"]["unavailable_days"]):
                    if count == 0:
                        string += f"\nclass_days NOT LIKE '%{ua}%' "
                    else:
                        string += f"\nAND class_days NOT LIKE '%{ua}%' "
                string += ")"
        if "hard_constraints" in parameter and "no_class_after" in parameter["hard_constraints"]:
            if parameter['hard_constraints']['no_class_after']:
                string += "AND (\n"
                if parameter["hard_constraints"]["no_class_after"] == '6PM':
                    string += f"class_time NOT LIKE '%-6%PM' \n"
                    string += f"AND class_time NOT LIKE '%-7%PM' \n"
                    string += f"AND class_time NOT LIKE '%-8%PM' \n"
                    string += f"AND class_time NOT LIKE '%-9%PM' \n"
                if parameter["hard_constraints"]["no_class_after"] == '5PM':
                    string += f"class_time NOT LIKE '%-5%PM' \n"
                    string += f"AND class_time NOT LIKE '%-6%PM' \n"
                    string += f"AND class_time NOT LIKE '%-7%PM' \n"
                    string += f"AND class_time NOT LIKE '%-8%PM' \n"
                    string += f"AND class_time NOT LIKE '%-9%PM' \n"
                if parameter["hard_constraints"]["no_class_after"] == '4PM':
                    string += f"class_time NOT LIKE '%-4%PM' \n"
                    string += f"AND class_time NOT LIKE '%-5%PM' \n"
                    string += f"AND class_time NOT LIKE '%-6%PM' \n"
                    string += f"AND class_time NOT LIKE '%-7%PM' \n"
                    string += f"AND class_time NOT LIKE '%-8%PM' \n"
                    string += f"AND class_time NOT LIKE '%-9%PM' \n"
                string += ")"

            queries.append(string)
        return queries
    
    def clear_values(self):
        self.values.clear()
        if len(self.values) == 0:
            return True
        return False
    
    def base_string(self) -> str:
        return textwrap.dedent("""
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
    
