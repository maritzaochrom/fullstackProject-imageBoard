import express from 'express';

import { getPost, createPost } from '../controllers/postsController.js';

const router = express.Router();

// EN VEZ DE TENER TODAS LAS RUTAS ASI, CREAMOS EL CONTROLLERS
// router.get('/', (req, res) => {
//   res.send('Hello, World');
// });

router
  .route('/')
  .get(getPost)
  .post(createPost)

// PUEDO PONER TAMBIEN EN VEZ DE LO ANTERIOR
// router.get('/', getPost);
// router.post('/', createPost)

export default router;

