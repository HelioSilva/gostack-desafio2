const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  if (title && url && techs) {
    const repository = { id: uuid(), title, url, techs, likes: 0 };
    repositories.push(repository);

    response.json(repository);
  } else {
    response.status(400).json({ message: "error: Dados incompletos" });
  }
});

app.put("/repositories/:id", (request, response) => {
  const cod = request.params.id;
  const index = repositories.findIndex((item) => item.id === cod);

  if (index < 0) {
    response.status(400).json({ message: "Repository not found" });
  }

  const { title, url, techs } = request.body;

  const { id, likes } = repositories[index];
  repositories[index] = { id, title, url, techs, likes };

  response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const cod = request.params.id;
  const index = repositories.findIndex((item) => item.id === cod);

  if (index < 0) {
    response.status(400).json({ message: "Repository not found" });
  }

  repositories.splice(index, 1);
  response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const cod = request.params.id;
  const index = repositories.findIndex((item) => item.id === cod);

  if (index < 0) {
    response.status(400).json({ message: "Repository not found" });
  }

  const { likes } = repositories[index];
  repositories[index].likes = likes + 1;

  response.json(repositories[index]);
});

module.exports = app;
