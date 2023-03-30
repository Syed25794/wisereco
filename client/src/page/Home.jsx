import { Box, Button } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import InputBox from '../components/InputBox'
import Note from '../components/Note'
import NotePopUp from '../components/NotePopUp'
import { ISCLICKED_FALSE, RESET_FORM_DATA, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType'
import { NotesContext } from '../context/NoteContext'

const Home = () => {
  const [state,dispatch]=useContext(NotesContext);
  // const { page, formData,showColorImage} = state;
  // const { isClicked } = state ;
  console.log(state);
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const [formData,setFormData]=useState({ title:"", tagline:"", text:"", image:"", background_color:"", isPinned:false});
  const [showColorImage,setShowColorImage]=useState(false);

  useEffect(()=>{
    async function loadNotes(){
      const response = await fetch(`https://wisereco.onrender.com/notes/getNotes?page=${page}`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      });
      const result = await response.json();
      setData(result.result);
    }
    loadNotes();
  },[page]);

  const hideInputs=(e)=>{
    dispatch({type:ISCLICKED_FALSE});
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    dispatch({type:RESET_FORM_DATA});
  }


  return (
    <Box onClick={hideInputs}>
        <Button colorScheme="blue" variant="ghost" onClick={()=>setPage(page+1)} disabled={ data.length < 6 }>Next</Button>
        <Button colorScheme="blue" variant="ghost" onClick={()=>setPage(page-1)} disabled={ page === 1}>Previous</Button>
        <InputBox formData={formData} setFormData={setFormData} showColorImage={showColorImage} setShowColorImage={setShowColorImage} />
        <Note />
        <NotePopUp />
    </Box>
  )
}

export default Home