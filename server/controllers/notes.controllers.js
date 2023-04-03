const Note = require("../models/notes.model");
// const cloudinary = require("./../utils/cloudinary");

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
        const pinnedNotes = await Note.find({ isPinned: true }).sort({ updatedAt: -1 });
        const unpinnedNotes = await Note.find({isPinned:false}).sort({updatedAt:-1});

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

        // let newImage = image ; 
        // console.log(newImage,"image");
        // if( image ){
        //     const imageResponse = await cloudinary.uploader.upload(image,{
        //         upload_preset:"wiser_eco"
        //     });
        //     if( imageResponse ){
        //         newImage=imageResponse
        //     }
        // }
        // console.log(newImage,"image after");

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
      const { id } = req.params;
      const { title, tagline, text, isPinned, background_color, image } = req.body;
      //handling the error if id is not found!
      if (!id) {
        res.status(400).send({ message: "Id is not found!" });
        return;
      }
  
    //   //If image uploaded again
    //   if( image[0] === 'd'){
    //     if( image ){
    //         const imageResponse = await cloudinary.uploader.upload(image,{
    //             upload_preset:"wiser_eco"
    //         });
    //         if( imageResponse ){
    //             newImage=imageResponse
    //         }
    //     }
    //   }else{
    //     newImage = image ;
    //   }

      //updating the notes data and responding the same.
      const updatedNote = await Note.findOneAndUpdate({ _id: id }, { title, tagline, text, isPinned, background_color, image }, { new: true });
      res.status(200).send({ updatedNote });
    } catch (error) {
        //handling the error
      res.status(500).send({ error: error.message });
    }
  };

const deleteNote = async ( req, res )=>{
    //Getting id from params and handling the error if id is not found!
    const { id } = req.params;
    if( !id ){
        res.status(400).send({message:"Id is not found!"});
    }
    try {
        //deleting the note and responding with true.
        const deletedNote = await Note.deleteOne({_id:id});
        res.status(200).send({result:true});
    } catch (error) {
        //handling the error
        res.status(500).send({error:error.message});
    }
}


//Exporting all the functions
module.exports = { getNotes, createNote, updateNote, deleteNote };