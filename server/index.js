// entrar a la carpeta server en la terminal, y poner npm start

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


//REQUIRE ROUTES
import postsRouter from './routes/posts.js'; // no olvidar la extension
// const postsRouter = require('./routes/posts');  // NO USAR require porque estamos usando el import express from 'express'

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))    // limite de exceso de el arcchivo es 30mb
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


//ADD ROUTES
app.use("/posts", postsRouter);

const CONNECTION_URL = 'mongodb+srv://fullstack-project:123test@cluster0.kwrlt.mongodb.net/fullstackDB?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
})
.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); // to avoid warnings
