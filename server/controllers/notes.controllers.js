const Note = require("../models/notes.model");

const getNotes = async ( req, res )=>{
    try {
        const { page } = req.query ;

        if( !page ){
            res.status(400).send({"message":"page query is not found!"});
        }
        const limit = 6 ;
        const startIndex = ( Number(page)- 1 ) * limit ; 
        const endIndex = page * limit ;

        const pinnedNotes = await Note.find({ isPinned: true }).sort({ updatedAt: -1 });
        const unpinnedNotes = await Note.find({isPinned:false}).sort({updatedAt:-1});

        const combinedNotes = [...pinnedNotes,...unpinnedNotes];
        const result = combinedNotes.slice(startIndex,endIndex);
        res.status(200).send({result});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

const createNote = async ( req, res )=>{
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
        const createdNote = await Note.insertMany([newNote],{returnDocument:"after"});
        res.status(201).send({createdNote});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

const updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, tagline, body, isPinned, background_color, image } = req.body;
      if (!id) {
        res.status(400).send({ message: "Id is not found!" });
        return;
      }
  
      const updatedNote = await Note.findOneAndUpdate({ _id: id }, { title, tagline, body, isPinned, background_color, image }, { new: true });
      console.log(updatedNote);
      res.status(200).send({ updatedNote });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  };

const deleteNote = async ( req, res )=>{
    const { id } = req.params;
    if( !id ){
        res.status(400).send({message:"Id is not found!"});
    }
    try {
        const deletedNote = await Note.deleteOne({_id:id});
        res.status(200).send({result:true});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

module.exports = { getNotes, createNote, updateNote, deleteNote };