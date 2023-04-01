import { Box, GridItem, Image } from "@chakra-ui/react";
import { ImagePreview } from "./ImagePreview";
import { useContext, useEffect } from "react";
import { NotesContext } from "../context/NoteContext";
import { SHOW_NOTES_FALSE, SHOW_NOTES_TRUE } from "../context/actionType";



const Note = ({data}) => {
  const [,dispatch]=useContext(NotesContext);

  useEffect(()=>{
    if( data ){
      dispatch({type:SHOW_NOTES_TRUE});
    }else{
      dispatch({type:SHOW_NOTES_FALSE});
    }
  },[dispatch,data]);

  return (
    <GridItem width="400px">
      <Box width="400px" boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" zIndex="2" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundColor={ data.background !== "" ? data.background :"white"} backgroundImage={ data.image !== "" ? `url(${data.background})` : null}>

        {/* Uploaded Image preview and deleteIcon */}
        <Box>
          { data.image !== "" ?
            <>
              <ImagePreview image={data.image} /> 
            </> : null 
          }
        </Box>

        <Box display="flex" gap="15px" padding="2px 3px" marginTop={data.image !== "" ? "20px" : "0px"} >

          {/* Tagline of note */}
          <Box width="370px" p="5px 0px 5px 5px" wordBreak="break-word">
              {data.text}
          </Box>

          {/* Pinned Icon */}
          <Box margin="5px">
            <Image name="isPinned" borderRadius="5px" backgroundColor={data.isPinned ? "blue.500" :"none"} width="50px" padding="2px 3px" height="40px"  src="./pin.png" alt="Pinned Note" />
          </Box>
        </Box>
      </Box>
    </GridItem>
  );
};

export default Note;
