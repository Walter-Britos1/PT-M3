const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

const STATUS_ERROR = 400;


server.post('/posts', (req, res) => {
  let { author, title, contents } = req.body

  if (!author || !title || !contents){
    return res.status(STATUS_ERROR).json({error: 'No se recibieron los parámetros necesarios para crear la publicación'});
  } 

  const newPost = {
    author,
    title,
    contents,
    id: publications.length + 1,
  }
  publications.push(newPost);
  res.send(newPost);
});

server.get('posts/:author/:title', (req, res) =>{
  const { author, title } = req.query;
  const postAuthorTitle = publications.filter(p => p.author === author  && p.title === title);
  if (postAuthorTitle){
    res.json(postAuthorTitle);
  } else {
    return res.status(STATUS_ERROR).res.json({error:'No existe ninguna publicación con dicho título y autor indicado'});
  }
});

server.get('/posts/:author', (req, res) => {
  const { author } = req.params;
  const postAuthor = publications.filter((p) => p.author === author);
  if (!postAuthor.length) return res.status(STATUS_ERROR).json({error:'No existe ninguna publicación del autor indicado'});
  res.json(post)
});

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body
  const postId = publications.find((p) => p.id === id);
  if (!postId) return res.status(STATUS_ERROR).json({error:'No se recibió el id correcto necesario para modificar la publicación'});
  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(STATUS_ERROR).json({error:'No se recibió el id de la publicación a eliminar'});
  const idPost = publications.find((p) => p.id === id);
  if (!idPost) return res.status(STATUS_ERROR).json({error:'No se recibió el id correcto necesario para eliminar la publicación'});
  postId = postId.filter(p => p.id !== id)
  res.json({success: true })
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
