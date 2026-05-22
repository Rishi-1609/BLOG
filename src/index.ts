import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ url: req.url, message: "Request received." });
});

app.listen(PORT, () => {
  console.log(`Server is running on at http://localhost:${PORT}`)
});
