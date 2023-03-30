import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import {  RESET_IMAGE } from '../context/actionType';

export const DeleteIcon = ()=>{
    const [,dispatch]=useContext(NotesContext);

    //deleting uploaded image
    const deleteImage=()=>{
        dispatch({type:RESET_IMAGE});
    }
    return (
        <Box onClick={deleteImage} width="50px" height="50px"  marginTop="-60px" marginLeft="620px" zIndex="1">
            <Image height="40px" widht="40px" src='./trash.png' alt="Trash" />
        </Box>
    );
}