import axios from 'axios';
declare const request : any;

const createNoteEntry = async ()=>{
  //creating notes first
  const payload = {
    title:'This is test title',
    tagline:'This is test tagline',
    text:'This is test text'
  }
  const url = 'https://wisereco.onrender.com/notes/createNote';
  const createResponse = await axios.post(url,payload);
  const data = createResponse.data;
  const { createdNote } = data;
  const { _id } = createdNote;


  // now setting body and header
  let newBody = {}
  if( request.method === 'PATCH' ){
    const body = JSON.parse(request.body);
    newBody = { ...body, id : _id};
  }else {
    newBody = { id : _id }
  }
  
  request.body= JSON.stringify(newBody);
  request.headers['Content-Type'] = 'application/json';
}

await createNoteEntry()