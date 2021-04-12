import PostMessage from '../models/postMessage.js';    // poner la extension .js  porque estamos en el lado del server node


export const getPost = async (req, res, next) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({message: error.message});
    }

};

export const createPost = async (req, res, next) => {
    // try {
    //   const post = new PostMessage({
    //     title: req.body.title,      // .name representa lo del html name="name"  // firstName es lo del schema
    //     message: req.body.message,
    //     creator: req.body.creator,
    //     tags: req.body.tags
    //   });

    //   await post.save();
    //   res.send('Success: created');

    // } catch(error) {
    //     res.send({"Message": error});
    // }

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
