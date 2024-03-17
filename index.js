const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const filePath = "./data/db.json";

// Endpoint untuk mendapatkan semua data blog
app.get("/blogs", async (req, res) => {
  try {
    const data = await fs.readFile(filePath);
    const jsonData = JSON.parse(data);
    res.json(jsonData.blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint untuk menghapus blog berdasarkan ID
app.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await fs.readFile(filePath);
    const jsonData = JSON.parse(data);
    const updatedBlogs = jsonData.blogs.filter((blog) => blog.id !== id);
    jsonData.blogs = updatedBlogs;
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    res.status(204).end(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
