import { Box } from "@chakra-ui/react"
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import {  SET_BACKGROUND_COLOR,  SET_IMAGE_FALSE , SHOW_COLOR_IMAGE_FALSE } from '../context/actionType';

const Color=({object})=>{
  const [,dispatch]=useContext(NotesContext);

  const handleBackgroundColor=(color)=>{
    dispatch({type:SET_BACKGROUND_COLOR,payload:color})
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    dispatch({type:SET_IMAGE_FALSE});
  }

  return <Box onClick={()=>handleBackgroundColor(object.color)} width="40px" height="40px" backgroundColor={object.color} borderRadius="50%" _hover={{borderRadius:"50%",border:"1px solid black"}}></Box>
}

export default Color;