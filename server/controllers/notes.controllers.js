import Note from "../models/notes.model";

export const getNotes = async ( req, res )=>{
    const { page } = req.query ;

    if( !page ){
        res.status(400).send({"message":"page query is not found!"});
    }

    const limit = 6 ;
    const skips = ( Number(page)- 1 ) * limit ; 
    try {
        const notes = await Note.find().sort({updatedAt:-1}).skip(skips).limit(limit);
        res.status(200).send({notes});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

export const createNote = async ( req, res )=>{
    const { title, tagline, body, isPinned, background_color, image } = req.body;
    try {
        const newNote = new Note({
            title,
            tagline,
            body,
            isPinned,
            background_color,
            image
        });
        const createdNote = await Note.insertOne(newNote,{returnDocument:"after"});
        res.status(201).send({createdNote});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

export const updateNote = async ( req, res )=>{
    const { id } = req.query;
    const { title, tagline, body, isPinned, background_color, image } = req.body;
    if( !id ){
        res.status(400).send({message:"Id is not found!"});
    }
    try {
        const updatedNote = await Note.updateOne({title,tagline,body,isPinned,background_color,image},{returnDocument:"after"});
        res.status(204).send({updatedNote});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

export const deleteNote = async ( req, res )=>{
    const { id } = req.query;
    if( !id ){
        res.status(400).send({message:"Id is not found!"});
    }
    try {
        const deletedNote = await Note.deleteOne({_id:id},{returnDocument:"after"});
        res.status(200).send({deleteNote});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

module.exports = { getNotes, createNote, updateNote, deleteNote };