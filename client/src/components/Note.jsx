import { Box, Image, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
// import { SHOW_NOTES_FALSE, SHOW_NOTES_TRUE } from "../context/actionType";
import DeleteAlert from "./DeleteAlert";
import NotePopUp from "./NotePopUp";
import { POPULATE_FORM_DATA } from "../context/actionType";



const Note = ({data}) => {
  const [,dispatch]=useContext(NotesContext);
  const { isOpen: isOpenFirst, onOpen: onOpenFirst, onClose: onCloseFirst } = useDisclosure();
  const { isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: onCloseSecond } = useDisclosure();

  const handleOpenFirstModal = (e,data) => {
    e.stopPropagation();
    console.log("popup",data);
    dispatch({type:POPULATE_FORM_DATA,payload:data})
    onOpenFirst();
  };

  const handleOpenSecondModal = (e) => {
    e.stopPropagation();
    onOpenSecond();
  };
  

  return (
    <Box width={["250px","300px","350px","400px"]} onClick={(e)=>handleOpenFirstModal(e,data)}>
      
      <Box boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundColor={ data.background !== "" ? data.background :"white"} backgroundImage={ data.image !== "" ? `url(${data.background})` : null}>
        {/* Delete Alert Modal */}
        {/* Pinned Icon  and deleteIcon*/}
        <Box display="flex" justifyContent="space-between" p="5px 10px">
          <Image onClick={()=>handleOpenFirstModal(data)} padding={["2px 3px","2px 3px","3px 5px"]} name="isPinned" borderRadius="5px" _hover={{backgroundColor:"blue.500"}} backgroundColor={data.isPinned ? "blue.500" :"none"} width={["28px","40px","47px"]} height={["28px","35px","47px"]} src="./pin.png" alt="Pinned Note" />
          <NotePopUp onClose={onCloseFirst} isOpen={isOpenFirst} noteData={data} />
          <DeleteAlert onClose={onCloseSecond} isOpen={isOpenSecond} id={data._id} />
          <Image onClick={handleOpenSecondModal}  padding={["2px 3px","2px 3px","3px 5px"]} name="delete" borderRadius="5px" _hover={{backgroundColor:"red.700"}} width={["28px","40px","47px"]} height={["28px","35px","47px"]}  src='./trash.png' alt="Trash" />
        </Box>
        
        {/* Uploaded Image preview */}
        { data.image !== "" && data.image !== undefined  ?
          <>
            <Image borderRadius="9px 9px 0px 0px" width="full" src={data.image.url} alt="Image Preview" />
          </> : null 
        }

        {/* Tagline of note */}
        <Box padding={["2px 3px","3px 5px","5px 10px"]} textAlign="center" wordBreak="break-word" backgroundColor={ data.background_color[0] === "#" ? data.background_color : null } backgroundImage={data.background_color[0] === "h" ? `url(${data.background_color})` : null } fontSize={["sm","md","lg"]}>
          {data.text}
        </Box>

      </Box>
    </Box>
  );
};

export default Note;
