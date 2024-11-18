import axios from 'axios';
declare const response : any ;

const getCreatedNoteId = async ()=> {
    console.log('Here we are...');
    const body = JSON.parse(response.body);
    const { createdNote } = body;
    const { _id } = createdNote;
    
    // setup the correct url and its parameters
    const host = 'https://wisereco.onrender.com'
    const path = `/notes/${_id}`
    const url = host + path;
    console.log('url',url);
    const notes = await axios.delete(url);
    console.log('notes',notes.data);
}

getCreatedNoteId()
