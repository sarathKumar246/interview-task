import express from "express";
import cors from "cors";
import { generateQuestions } from "./openai.js";
import { saveQuestionSet, getAllQuestionSets } from "./storage.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { role, difficulty } = req.body;

  const questions = await generateQuestions(role, difficulty);

  const record = {
    role,
    difficulty,
    questions,
    timestamp: new Date().toISOString()
  };

  saveQuestionSet(record);
  res.json(record);
});

app.get("/saved", (req, res) => {
  res.json(getAllQuestionSets());
});

app.get("/export", (req, res) => {
  const data = getAllQuestionSets();
  let csv = "Role,Difficulty,Questions,Timestamp\n";

  data.forEach(d => {
    csv += `${d.role},${d.difficulty},"${d.questions.replace(/"/g, "")}",${d.timestamp}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("question_sets.csv");
  res.send(csv);
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
