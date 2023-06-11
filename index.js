const express = require("express");
const app = express();
const morgan = require("morgan");
const {
  agregarPosts,
  obtenerPosts,
  agregarLike,
  borrarPosts,
} = require("./consultas.js");
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
// Parte 1 Desafio LikeMe
// obtenerPosts = GET /posts
app.get("/posts", async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});
// agregarPost = POST /posts
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    const post = await agregarPosts(titulo, img, descripcion, likes);
    res.json({titulo, img, descripcion, likes});
  } catch (error) {
    console.error(error);
  }
});

// Parte 2 Desafio LikeMe
// agregarLike = PUT /like
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const like = await agregarLike(id);
    res.send(like);
  } catch (error) {
    console.error(error);
  }
});
// borrarPost = DELETE /posts
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await borrarPosts(id);
    res.send(post);
  } catch (error) {
    console.error(error);
  }
});
