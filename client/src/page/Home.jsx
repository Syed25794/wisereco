import { Box, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import CreateNoteContainer from '../components/CreateNoteContainer'
import { ISCLICKED_FALSE, RESET_FORM_DATA, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType'
import { NotesContext } from '../context/NoteContext'
import { NotesLayout } from '../components/NotesLayout';
import AlertComponent from '../components/AlertComponent'

const Home = () => {
  const [state,dispatch,,getNotes]=useContext(NotesContext);
  const { isLoadingNotes , isSuccessNotes , isErrorNotes, notes , isErrorPost,isSuccessPost , page ,isSuccessDelete , isErrorDelete,isSuccessUpdate,isErrorUpdate , isValidInputs } = state ;

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
        {/* Enter all the inputs */}
        { !isValidInputs ? <AlertComponent status="error" description="Please enter all the inputs!" /> : null }

        {/* Create Note Success */}
        { isSuccessPost ? <AlertComponent status="success" description="Note is Created Successfully!" /> : null }

        {/* Create Note Error */}
        { isErrorPost ? <AlertComponent status='error' description="Something went wrong!" /> : null }

        {/* Updated Note Success */}
        { isSuccessUpdate ? < AlertComponent status="success" description="Note is updated successfully!" />: null}

        {/* Updated Note Error */}
        { isErrorUpdate ? <AlertComponent status='error' description="Something went wrong!" /> : null }

        {/* Delete Note Success  */}

        { isSuccessDelete ? <AlertComponent status='success' description="Note is deleted successfully !" /> : null }
        {/* Delete Note Error */}

        { isErrorDelete ? <AlertComponent status='error' description="Something went wrong!" /> : null}

        {/* Note Create Container */}
        <CreateNoteContainer />

        {/* All Alert and Notifications */}
        {/* Loading Spinner */}
        { isLoadingNotes ? 
          <Box display="flex" flexDir="column" gap={6} justifyContent="center" alignItems="center" >
            <Text color="purple" fontSize={["md","lg","2xl"]}>{`Page ${page} Notes are loading...`}</Text>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
          </Box> : null }

        {/* If number of notes are zero */}
        { isSuccessNotes && notes.length === 0 && page === 1 ?  
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text color="purple" fontSize={["md","lg","2xl"]}>Please create some notes!</Text>
          </Box> : null}

        {/* If something went wrong in backend */}
        { isErrorNotes ?
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text color="red" fontSize={["md","lg","2xl"]}>Something went wrong...!</Text>
          </Box> : null}

        {/* Notes Layout */}
        <NotesLayout />
    </Box>
  )
}

export default Home