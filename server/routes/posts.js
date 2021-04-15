import express from 'express';
//import { deletePost } from '../../client/src/api/index.js';

import { getPost, createPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';

const router = express.Router();

// EN VEZ DE TENER TODAS LAS RUTAS ASI, CREAMOS EL CONTROLLERS
// router.get('/', (req, res) => {
//   res.send('Hello, World');
// });

// router
//   .route('/')
//   .get(getPost)
//   .post(createPost)
  //.patch('/:id', updatePost)     //patch particial update,  put reemplazara todo, por eso vamos a usar patch

// PUEDO PONER TAMBIEN EN VEZ DE LO ANTERIOR
router.get('/', getPost);
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)    //router.post('/:id', likeCounter)

export default router;

