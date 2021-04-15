import PostMessage from '../models/postMessage.js';    // poner la extension .js  porque estamos en el lado del server node
import mongoose from 'mongoose';

export const getPost = async (req, res, next) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({message: error.message});
    }

};

export const createPost = async (req, res, next) => {

    // DCI teacher way to do it
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

// export default getPost;  // error si uso esto  si le quito el { getPost } en el archivo posts.js si funciona no se porque

// CAMBIAMOS ESTE CODIGO DE UPDATE POR EL DE ABAJO, PORQUE TIENE  PROBLEMAS AL MOMENTO DE MANDAR EL res.json NO ESPERA AL AWAIT Y PASA LA CONST updatePost sin actualizarla
// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);   // importar mongoose
//     const updatePost = { creator, title, message, tags, selectedFile, _id: id };
//     await PostMessage.findByIdAndUpdate(id, updatePost, { new: true });
//     res.json(updatedPost);
// }


//
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);
    //const updatePost = {creator, title, message, tags, selectedFile, _id: id };
    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatePost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    res.json("Post deleted sucessfully.");
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    const post = await PostMessage.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    const likedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },     //likeCount es como esta el esquema
        { new: true });
    res.json(likedPost);
}
