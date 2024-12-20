import axios from 'axios';
declare const response : any ;


const getNoteIdAndDeleteNote = async()=>{
    const body = JSON.parse(response.body);
    const { createdNote } = body;
    const { _id } = createdNote;
    
    // setup the correct url and its parameters
    const host = 'https://wisereco.onrender.com'
    const path = '/notes/deleteNote'
    const url = host + path;
    const notes = await axios.delete(url,{ data: { id : _id }});
}
await getNoteIdAndDeleteNote();
