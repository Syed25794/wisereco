const Note = require("../models/notes.model");

const getNotes = async ( req, res )=>{
    try {
        const { page } = req.query ;

        if( !page ){
            res.status(400).send({"message":"page query is not found!"});
        }
        const limit = 6 ;
        const skips = ( Number(page)- 1 ) * limit ; 
        let remainingNotes=0;

        const pinnedNotes = await Note.find({ isPinned: true }).sort({ updatedAt: -1 }).skip(skips).limit(limit);
        remainingNotes=limit-pinnedNotes.length;
        console.log(remainingNotes,pinnedNotes.length,skips);
        if( pinnedNotes.length === 0 ){
            const unpinnedNotes = await Note.find().sort({updatedAt:-1}).skip(skips).limit(limit);
            return res.status(200).send({pinnedNotes,unpinnedNotes});
        }
        
        if( remainingNotes > 0 ){
            console.log("high");
            const unpinnedNotes = await Note.find({isPinned:false}).sort({updatedAt:-1}).limit(remainingNotes);
            res.status(200).send({unpinnedNotes,pinnedNotes});
        }else{
            console.log("low");
            res.status(200).send({unpinnedNotes:[],pinnedNotes});
        }
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}



//     const pinnedCount = await Note.countDocuments({ isPinned: true });
//     const nonPinnedSize = size - pinnedCount;
//     const nonPinnedNotes = await Note.find({ isPinned: false })
//       .sort({ updatedAt: -1 })
//       .skip((page - 1) * nonPinnedSize)
//       .limit(nonPinnedSize);
//     const total = pinnedCount + await Note.countDocuments({ isPinned: false });
//     const notes = [...pinnedNotes, ...nonPinnedNotes];
//     res.status(200).json({ notes, total });

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