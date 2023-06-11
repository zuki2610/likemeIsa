const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "2201",
  database: "likeme",
  allowExitOnIdle: true,
});
// Parte 1 Desafio LikeMe
// agregarPosts = GET /posts
const agregarPosts = async (titulo, img, descripcion, likes) => {
  try {
    const consulta = `INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)`;
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Post agregado exitosamente");
  } catch (error) {
    console.error(error);
  }
};
// obtenerPosts = POST /posts
const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};
// Parte 2 Desafio LikeMe
// agregarLike = PUT /likes
const agregarLike = async (id) => {
  try {
    const consulta = `UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1`;
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log(result);
    console.log("Like agregado exitosamente");
  } catch (error) {
    console.error(error);
  }
};
// borrarPosts = DELETE /posts
const borrarPosts = async (id) => {
  const consulta = `DELETE FROM posts WHERE id = $1`;
  const values = [id];
  const result = await pool.query(consulta, values);
  console.log("Post borrado exitosamente");
};

module.exports = { agregarPosts, obtenerPosts, agregarLike, borrarPosts };
