import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import { DELETE_NOTE_ERROR, DELETE_NOTE_LOADING, DELETE_NOTE_SUCCESS } from "../context/actionType";

function DeleteAlert({onClose,isOpen , id }) {
    const cancelRef = React.useRef();
    const [state,dispatch]=useContext(NotesContext);
    const { isLoading  } = state ;

    const handleDelete=async()=>{
        dispatch({type:DELETE_NOTE_LOADING});
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`,{
                method:"DELETE"
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