import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

export const ImagePreview = ({image})=>{
    const [state,]=useContext(NotesContext);
    const { formData } = state ;
    if( formData.image === "" ){
        return (
            <Box zIndex="10">
                <Image height="250px" borderRadius="9px 9px 0px 0px" width="400px" src={image.url} alt="Image Preview" />
            </Box>
        );
    }

    //Upload Image Preview Compoenent
    return (
        <Box zIndex="10">
            <Image borderRadius="9px 9px 0px 0px" width="full" src={formData.image} alt="Image Preview" />
        </Box>
    );
}