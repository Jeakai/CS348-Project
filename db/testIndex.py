import mysql.connector
import time
import statistics

# returns avg of query after number of iterations
def run_query(cursor, query, iterations=100):
    times = []
    for _ in range(iterations):
        start = time.time()
        cursor.execute(query)
        cursor.fetchall()
        end = time.time()
        times.append(end - start)
    return min(times) * 1000, statistics.mean(times) * 1000, max(times) * 1000

def test_index(cursor, table_name, column_name, test_value, index_name):
    query = f"SELECT * FROM {table_name} WHERE {column_name} LIKE '%{test_value}%'"
    try:
        # remove index and test
        cursor.execute(f"DROP INDEX {index_name} ON {table_name}")
        no_idx_min, no_idx_avg, no_idx_max = run_query(cursor, query)
        # put index back and test
        cursor.execute(f"CREATE INDEX {index_name} ON {table_name}({column_name})")
        idx_min, idx_avg, idx_max = run_query(cursor, query)
        print(f"\n------- Without Index: {index_name} -------")
        print(f"\tAverage: {no_idx_avg}\n\tMax: {no_idx_max}\n\tMin: {no_idx_min}\n")
        print(f"------- With Index: {index_name} -------")
        print(f"\tAverage: {idx_avg}\n\tMax: {idx_max}\n\tMin: {idx_min}\n")
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    db = mysql.connector.connect(
        host="",
        user="",
        password="",
        database=""
    )
    cursor = db.cursor()
    test_index(cursor, "players", "pname", "a", "idx_players_name")