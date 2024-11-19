import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import { DELETE_NOTE_ERROR, DELETE_NOTE_LOADING, DELETE_NOTE_SUCCESS, RESET_DELETE_FLAGS } from "../context/actionType";

function DeleteAlert({onClose,isOpen , id }) {
    const cancelRef = React.useRef();
    const [state,dispatch,,getNotes]=useContext(NotesContext);
    const { isLoading  } = state ;

    const handleDelete=async()=>{
        dispatch({type:DELETE_NOTE_LOADING});
        try {
            const response = await fetch(`https://wisereco.onrender.com/notes/deleteNote`,{
                method:"DELETE",
                body: JSON.stringify({ id : id})
            });
            const result = await response.json();
            if( result.result ){
                dispatch({type:DELETE_NOTE_SUCCESS,payload:id});
            }
            onClose();
        } catch (error) {
            dispatch({type:DELETE_NOTE_ERROR,payload:error.message});
            onClose();
        }
        getNotes();
        setTimeout(()=>{
            dispatch({type:RESET_DELETE_FLAGS});
        },3000)
    }
   
  
    return (
      <>
        <AlertDialog size={["xs","md","lg"]}  isOpen={isOpen}  leastDestructiveRef={cancelRef}  onClose={onClose}  isCentered={true}  motionPreset='slideInRight'>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize={['sm','md','lg']} fontWeight='bold'>
                Delete Note
              </AlertDialogHeader>
  
              <AlertDialogBody fontSize={['sm','md','lg']}>
                Are you sure to delete this note? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} fontSize={['sm','md','lg']}>
                  Cancel
                </Button>
                <Button fontSize={['sm','md','lg']} isLoading={isLoading} loadingText="Deleting Note..." colorScheme='red' onClick={handleDelete} ml={[1,2,3]}>
                  Delete Note
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}

export default DeleteAlert;