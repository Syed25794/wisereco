import { Box, Button } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import InputBox from '../components/InputBox'
import Note from '../components/Note'
import NotePopUp from '../components/NotePopUp'
import { DECREMENT_PAGE, INCREMENT_PAGE, ISCLICKED_FALSE, RESET_FORM_DATA, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType'
import { NotesContext } from '../context/NoteContext'

const Home = () => {
  const [state,dispatch,,getNotes]=useContext(NotesContext);
  const { page , notes } = state;
  console.log(state);

  useEffect(()=>{
    getNotes();
  },[getNotes])


  const hideInputs=(e)=>{
    dispatch({type:ISCLICKED_FALSE});
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    dispatch({type:RESET_FORM_DATA});
  }

  const handlePage=(value)=>{
    switch(value){
      case 1:
        dispatch({type:INCREMENT_PAGE});
        break;
      case -1:
        dispatch({type:DECREMENT_PAGE});
        break;
      default :
        console.log("Default case");
    }
  }


  return (
    <Box onClick={hideInputs}>
        <Button colorScheme="blue" onClick={()=>handlePage(1)} variant="ghost" disabled={ notes.length < 6 }>Next</Button>
        <Button colorScheme="blue" onClick={()=>handlePage(-1)} variant="ghost" disabled={ page === 1}>Previous</Button>
        <InputBox />
        <Note />
        <NotePopUp />
    </Box>
  )
}

export default Home