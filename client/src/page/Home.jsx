import { Box, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import CreateNoteContainer from '../components/CreateNoteContainer'
import { ISCLICKED_FALSE, RESET_FORM_DATA, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType'
import { NotesContext } from '../context/NoteContext'
import { NotesLayout } from '../components/NotesLayout';
import AlertComponent from '../components/AlertComponent'

const Home = () => {
  const [state,dispatch,,getNotes]=useContext(NotesContext);
  const { isLoadingNotes , isSuccessNotes , isErrorNotes, notes , isErrorPost,isSuccessPost } = state ;

  useEffect(()=>{
    getNotes();
  },[getNotes])


  const hideInputs=(e)=>{
    dispatch({type:ISCLICKED_FALSE});
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    dispatch({type:RESET_FORM_DATA});
  }


  return (
    <Box onClick={hideInputs} mt={["10px","15px","20px"]}>
        <CreateNoteContainer />
        <NotesLayout />

        {/* Loading Spinner */}
        { isLoadingNotes ? 
          <Box display="flex" flexDir="column" gap={6} justifyContent="center" alignItems="center" >
            <Text color="purple" fontSize={["md","lg","2xl"]}>Notes are loading...</Text>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
          </Box> : null }

        {/* If number of notes are zero */}
        { isSuccessNotes && notes.length === 0 ?  
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text color="purple" fontSize={["md","lg","2xl"]}>Please create some notes!</Text>
          </Box> : null}

        {/* If something went wrong in backend */}
        { isErrorNotes ?
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text color="red" fontSize={["md","lg","2xl"]}>Something went wrong...!</Text>
          </Box> : null}

        {/* Create Post Success */}
        { isSuccessPost ? <AlertComponent status="success" description="Note is Created Successfully!" /> : null }

        {/* Create Post Error */}
        { isErrorPost ? <AlertComponent statu='error' description="Something went wrong!" /> : null }
    </Box>
  )
}

export default Home