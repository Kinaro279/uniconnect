from fastapi import FastAPI, BackgroundTasks
from tasks import process_note

app = FastAPI()

@app.post("/tasks/queue")
def queue_task(payload: dict, bg: BackgroundTasks):
    bg.add_task(process_note, payload["note_id"], payload["filename"])
    return {"queued": True}
