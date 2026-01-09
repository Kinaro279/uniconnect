import express from "express";
import jwt from "jsonwebtoken";
import notes from "./notes.js";
import { auth } from "./auth.js";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email.endsWith(".edu")) return res.sendStatus(403);
  res.json({
    token: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" })
  });
});

app.use("/notes", auth, notes);
app.listen(3000);
