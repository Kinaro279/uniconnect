CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL,
  uploader TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_hash TEXT UNIQUE,
  status TEXT CHECK (status IN ('PENDING','READY','DUPLICATE')),
  file_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);