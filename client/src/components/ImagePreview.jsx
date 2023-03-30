import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

export const ImagePreview = ()=>{
    const [state,]=useContext(NotesContext);
    const { formData } = state ;
    return (
        <Box zIndex="10">
            <Image height="300px" borderRadius="9px 9px 0px 0px" width="full" src={formData.image} alt="Image Preview" />
        </Box>
    );
}