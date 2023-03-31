import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useContext} from "react";
import { ISCLICKED_TRUE, SET_FORM_DATA, SET_IMAGE, SET_ISPINNED, SHOW_COLOR_IMAGE_TRUE } from "../context/actionType";
import { NotesContext } from "../context/NoteContext";
import ColorImage from "./ColorImage";
import { DeleteIcon } from "./DeleteIcon";
import { ImagePreview } from "./ImagePreview";
import { InputField } from "./InputField";



const InputBox = () => {
  const [state,dispatch,createNote]=useContext(NotesContext);
  const { isClicked, showColorImageBox, formData, setImage ,isPinned }=state;

  //handling form data and new note data
  const handleFormData=(e)=>{
    e.stopPropagation();
    // dispatch({type:ISCLICKED_TRUE});
    const { name, value } = e.target;
    switch ( name ){
      case "image":
        const file = e.target.files[0];
        TransformFile(file,name);
        break;
      case "isPinned":
        dispatch({type:SET_ISPINNED,payload:isPinned})
        break;
      default :
        dispatch({type:SET_FORM_DATA,payload:{name,value}});
    }
  }

  //Converting image file into 64 base url string
  const TransformFile=(file,name)=>{
    const reader = new FileReader();
      if( file ){
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
          dispatch({type:SET_IMAGE,payload:reader.result});
        };
      }
  }

  //Showing the whole input box
  const showInputs = (e)=>{
    e.stopPropagation();
    dispatch({type:ISCLICKED_TRUE});
  }

  //Showing background color and image
  const handleShowPalatte=(e)=>{
    e.stopPropagation();
    dispatch({type:SHOW_COLOR_IMAGE_TRUE});
  }




  const handleCreateNote = ()=>{
    createNote(state.formData);
  }

  

  return (
    <Box onClick={showInputs} position="relative" width="680px" height="300px" left="300px">
      <Box boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" position="absolute" zIndex="2" overflow="hidden" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundColor={ !setImage ? formData.background :"white"} backgroundImage={setImage ? `url(${formData.background})` : null}>
      <Box>
        {formData.image !== "" ? <><ImagePreview /> <DeleteIcon />                                                                                                                                                                                                                                                                     </> : null }
      </Box>
      <Box display="flex" gap="15px" padding="2px 3px" marginTop={formData.image !== "" ? "20px" : "0px"} >
        <Box width="595px" >
          { isClicked ? 
            <>
              <InputField type={"text"} name={"title"} value={formData.title} placeholder={"Enter Title of the note"} />
              <InputField    type={"text"} name={"tagline"} value={formData.tagline} placeholder={"Enter Tagline..."} required/>
            </> : null 
          }
          <InputField   type={"text"} name={"text"} value={formData.text} placeholder={"Take a note..."} required/>
        </Box>
        <Box marginTop="5px">
          {isClicked ? <Image onClick={(e)=>handleFormData(e)} name="isPinned" borderRadius="5px" _hover={{backgroundColor:"blue.500"}} backgroundColor={formData.isPinned ? "blue.500" :"none"} width="50px" padding="3px 5px" height="48px"  src="./pin.png" alt="Pinned Note" /> : null }
        </Box>
      </Box>
      
      {isClicked ? (<Box display="flex" justifyContent="space-between" margin="5px 15px">
        <Box display="flex" gap="10px">
          <Image onClick={handleShowPalatte} width="50px" padding="3px 5px" _hover={{background:"blue.500",borderRadius:"5px"}}  src="./palette.png" alt="Drawing Plate" />
          <label htmlFor="inputFile"><Image width="50px" padding="3px 5px" _hover={{background:"blue.500",borderRadius:"5px"}}  src="./image.png" alt="Upload Image" /></label>
          <Input onChange={handleFormData} name="image" id="inputFile" type="file" style={{display:"none"}} />
        </Box>
        <Button colorScheme="blue" variant="solid" onClick={handleCreateNote}>Create Note</Button>
      </Box>) : null }
      </Box>
      <Box zIndex="1" position="absolute" left="40px" top={formData.image !== "" ? "495px" : "180px"}>
        {showColorImageBox && isClicked ? <ColorImage /> : null }
      </Box>
    </Box>
  );
};

export default InputBox;
