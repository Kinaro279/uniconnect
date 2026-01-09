import express from "express";
import { db } from "./db.js";
import axios from "axios";

const router = express.Router();

router.post("/init-upload", async (req, res) => {
  const { course_id, filename, size } = req.body;

  const { rows } = await db.query(
    `INSERT INTO notes(course_id, uploader, filename, status)
     VALUES ($1,$2,$3,'PENDING') RETURNING id`,
    [course_id, req.user.email, filename]
  );

  await axios.post("http://python:8000/tasks/queue", {
    note_id: rows[0].id,
    filename,
    size
  });

  res.json({ note_id: rows[0].id });
});

router.get("/:id/download", async (req, res) => {
  const { rows } = await db.query(
    "SELECT file_url FROM notes WHERE id=$1 AND status='READY'",
    [req.params.id]
  );

  if (!rows.length) return res.sendStatus(404);
  res.redirect(rows[0].file_url);
});

export default router;
