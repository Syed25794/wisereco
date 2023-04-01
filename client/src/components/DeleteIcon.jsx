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
    //Delete Icon Component
    return (
        <Box onClick={deleteImage} marginTop={["-45px","-47px","-50px"]} marginLeft={["265px","405px","550px"]}>
            <Image width={["28px","40px","47px"]} height={["28px","45x","47px"]}  src='./trash.png' alt="Trash" />
        </Box>
    );
}