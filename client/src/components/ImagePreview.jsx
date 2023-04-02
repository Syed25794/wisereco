import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

export const ImagePreview = ({imageUrl})=>{
    const [state,]=useContext(NotesContext);
    const { formData } = state ;

    //Upload Image Preview Compoenent
    return (
        <Box zIndex="10">
            <Image borderRadius="9px 9px 0px 0px" width="full" src={ imageUrl !== undefined ? imageUrl : formData.image} alt="Image Preview" />
        </Box>
    );
}