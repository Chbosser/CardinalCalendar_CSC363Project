import textwrap
class QueryBuilder:
    def insert_user(self):
        string = textwrap.dedent("""
                            INSERT INTO users
                                 (first_name, last_name, email, username, password_hash)
                                 VALUES (%s, %s, %s, %s, %s)
                                   
                """)
        return string
    
    def get_user(self):
        string = textwrap.dedent("""
SELECT username, password_hash FROM users WHERE username = %s
""")
        return string