import hashlib
from db import conn

def process_note(note_id, filename):
    fake_data = filename.encode()
    file_hash = hashlib.sha256(fake_data).hexdigest()

    cur = conn.cursor()
    cur.execute("SELECT id FROM notes WHERE file_hash=%s", (file_hash,))
    duplicate = cur.fetchone()

    status = "DUPLICATE" if duplicate else "READY"

    cur.execute(
      "UPDATE notes SET file_hash=%s,status=%s WHERE id=%s",
      (file_hash, status, note_id)
    )
