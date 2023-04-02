import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import CreateNoteContainer from '../components/CreateNoteContainer'
import NotePopUp from '../components/NotePopUp'
import { ISCLICKED_FALSE, RESET_FORM_DATA, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType'
import { NotesContext } from '../context/NoteContext'
import { NotesLayout } from '../components/NotesLayout';

const Home = () => {
  const [,dispatch,,getNotes]=useContext(NotesContext);

  useEffect(()=>{
    getNotes();
  },[getNotes])


  const hideInputs=(e)=>{
    dispatch({type:ISCLICKED_FALSE});
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    dispatch({type:RESET_FORM_DATA});
  }


  return (
    <Box onClick={hideInputs}>
        <CreateNoteContainer />
        <NotesLayout />
        <NotePopUp />
    </Box>
  )
}

export default Home