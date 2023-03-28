import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InputBox from '../components/InputBox'
import Note from '../components/Note'
import NotePopUp from '../components/NotePopUp'

const Home = () => {
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const [isClicked,setIsClicked]=useState(false);
  const [formData,setFormData]=useState({ title:"", tagline:"", body:"", image:"", background_color:"", isPinned:false});



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
    setIsClicked(false);
    setFormData({...formData,title:"", tagline:"", body:"", image:"", background_color:"", isPinned:false})
  }


  return (
    <Box onClick={hideInputs}>
        <Button colorScheme="blue" variant="ghost" onClick={()=>setPage(page+1)} disabled={ data.length < 6 }>Next</Button>
        <Button colorScheme="blue" variant="ghost" onClick={()=>setPage(page-1)} disabled={ page === 1}>Previous</Button>
        <InputBox isClicked={isClicked} setIsClicked={setIsClicked} formData={formData} setFormData={setFormData} />
        <Note />
        <NotePopUp />
    </Box>
  )
}

export default Home