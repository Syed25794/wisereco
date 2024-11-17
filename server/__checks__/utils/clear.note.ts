import axios from 'axios';

const getCreatedNoteId = async ()=> {
    const body = JSON.parse(response.body);
    const { createdNote } = body;
    const { _id } = createdNote;
    console.log('response',body,_id);

        // setup the correct url and its parameters
    const host = 'https://wisereco.onrender.com'
    const path = '/notes/' + _id


    // delete the just created resource using the axios HTTP client
    const response = await axios.delete(host + path, {})
    console.log('response',response);
}

getCreatedNoteId()