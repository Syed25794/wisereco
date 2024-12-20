const Note = require("../models/notes.model");

const getNotes = async ( req, res )=>{
    try {
        //Parcing page from request object
        const { page } = req.query ;

        if( !page ){
            res.status(400).send({"message":"page query is not found!"});
        }

        //Declaring variables to handle the pagination
        const limit = 6 ;
        const startIndex = ( Number(page)- 1 ) * limit ; 
        const endIndex = page * limit ;

        //Quering all the pinned and unpinned Notes sorted with latest changed notes
        // Ensure indexes exist on the fields used in sorting
        await Note.createIndexes({ updatedAt: 1 });

        const pinnedNotes = await Note.find({ isPinned: true }).sort({ updatedAt: -1 }).allowDiskUse(true);
        const unpinnedNotes = await Note.find({ isPinned: false }).sort({ updatedAt: -1 }).allowDiskUse(true);
        // const pinnedNotes = await Note.find({ isPinned: true }).sort({ updatedAt: -1 });
        // const unpinnedNotes = await Note.find({isPinned:false}).sort({updatedAt:-1});

        //Combining the all notes and sending only 6 notes as per pinned true and page value
        const combinedNotes = [...pinnedNotes,...unpinnedNotes];
        const result = combinedNotes.slice(startIndex,endIndex);
        res.status(200).send({result});
    } catch (error) {
        //handling the error
        res.status(500).send({error:error.message});
    }
}

const createNote = async ( req, res )=>{

    //Parsing the data from request object
    const { title, tagline, text, isPinned, background_color, image } = req.body;

    try {
        //Creating an instance of note schema
        const newNote = new Note({
            title,
            tagline,
            text,
            isPinned,
            background_color,
            image
        });

        //Inserting note and sending response
        const createdNote = await newNote.save();
        res.status(201).send({createdNote});
    } catch (error) {
        //handling the error
        res.status(500).send({error:error.message});
    }
}

const updateNote = async (req, res) => {
    try {
      //Getting id from params and parsing the data from request object
      const { title, tagline, text, isPinned, background_color, image, id } = req.body;
      //handling the error if id is not found!
      if (!id) {
        return res.status(400).send({ message: "Id is not found!" });
      }

      //updating the notes data and responding the same.
      const updatedNote = await Note.findOneAndUpdate({ _id: id }, { title, tagline, text, isPinned, background_color, image }, { new: true });
      return res.status(200).send({ updatedNote });
    } catch (error) {
        //handling the error
      return res.status(500).send({ error: error.message });
    }
  };

const deleteNote = async ( req, res )=>{
    //Getting id from body and handling the error if id is not found!
    const { id } = req.body;
  
    if(!id){
        return res.status(400).send({message:"Id is not found!"});
    }
    try {
        //deleting the note and responding with true.
        Note.deleteOne({_id:id}).then((result)=>{
            if( result.deletedCount ){
                return res.status(200).send({result:true});
            }else{
                return res.status(400).send({error:'No Record Found!'});
            }
        });
    } catch (error) {
        //handling the error
        return res.status(500).send({error:error.message});
    }
}


//Exporting all the functions
module.exports = { getNotes, createNote, updateNote, deleteNote };
