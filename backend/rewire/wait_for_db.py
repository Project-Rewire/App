import time
from django.db import connections
from django.db.utils import OperationalError

def wait_for_db():
    db_conn = None
    while not db_conn:
        try:
            db_conn = connections['default']
            db_conn.cursor()
        except OperationalError:
            print("Database unavailable, waiting...")
            time.sleep(5)
    print("Database ready.")

if __name__ == '__main__':
    wait_for_db()
