import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useContext} from "react";
import { ISCLICKED_TRUE, SET_FORM_DATA, SET_IMAGE, SET_ISPINNED, SHOW_COLOR_IMAGE_FALSE, SHOW_COLOR_IMAGE_TRUE } from "../context/actionType";
import { NotesContext } from "../context/NoteContext";
import ColorImage from "./ColorImage";
import { DeleteIcon } from "./DeleteIcon";
import { ImagePreview } from "./ImagePreview";
import { InputField } from "./InputField";



const CreateNoteContainer = () => {
  const [state,dispatch,createNote]=useContext(NotesContext);
  const { isClicked, showColorImageBox, formData, setImage, isLoading }=state;

  //handling form data and new note data
  const handleFormData=(e)=>{
    e.stopPropagation();
    const { name, value } = e.target;
    switch ( name ){
      case "image":
        const file = e.target.files[0];
        TransformFile(file,name);
        break;
      case "isPinned":
        dispatch({type:SET_ISPINNED,payload:formData.isPinned})
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
    if( showColorImageBox ){
      dispatch({type:SHOW_COLOR_IMAGE_FALSE});
    }else{
      dispatch({type:SHOW_COLOR_IMAGE_TRUE});
    }
  }

  //Creating new note
  const handleCreateNote = ()=>{
    console.log(formData);
    createNote(state.formData);
  }

  

  return (
    <Box onClick={showInputs} width={["300px","460px","620px"]} maxH={["450px","550px","700px"]} m="auto" marginBottom="20px" marginTop="10px" >
      <Box boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" width="full" overflow="hidden" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundColor={ !setImage ? formData.background :"white"} backgroundImage={setImage ? `url(${formData.background})` : null}>

        {/* Uploaded Image preview and deleteIcon */}
        <Box>
          { formData.image !== "" ?
            <>
              <ImagePreview /> 
              <DeleteIcon /> 
            </> : null 
          }
        </Box>

      <Box display="flex" gap={["8px","10px","15px"]} padding={["0px","2px","3px"]} marginTop={formData.image !== "" ? "20px" : "0px"} >

        {/* Input fields ot tagline title and body */}
        <Box width="86%">
          { isClicked ? 
            <>
              <InputField type={"text"} name={"title"} value={formData.title} placeholder={"Enter Title of the note"} />
              <InputField type={"text"} name={"tagline"} value={formData.tagline} placeholder={"Enter Tagline..."} required/>
            </> : null 
          }
          <InputField   type={"text"} name={"text"} value={formData.text} placeholder={"Take a note..."} required/>
        </Box>

        {/* Pinned Icon */}
        <Box w="14%">
          { isClicked ? <Image m="auto" padding={["2px 3px","2px 3px","3px 5px"]} marginTop="2px" onClick={(e)=>handleFormData(e)} name="isPinned" borderRadius="5px" _hover={{backgroundColor:"blue.500"}} backgroundColor={formData.isPinned ? "blue.500" :"none"} width={["28px","40px","47px"]} height={["28px","35px","47px"]} src="./pin.png" alt="Pinned Note" /> : null }
        </Box>

      </Box>
      
      { isClicked ?
        (
          //Background Color and Image Icon and Upload Image Icon
          <Box display="flex" justifyContent="space-between" margin={["4px","2px 7px","5px 15px"]}>
            <Box display="flex" gap={["3px","5px","10px"]}>
              <Image onClick={handleShowPalatte} width={["28px","40px","47px"]} height={["28px","40x","47px"]} padding={["2px 3px","2px 3px","3px 5px"]} _hover={{background:"blue.500",borderRadius:"5px"}}  src="./palette.png" alt="Drawing Plate" />
              <label htmlFor="inputFile"><Image width={["28px","40px","47px"]} height={["28px","40x","47px"]} padding={["2px 3px","2px 3px","3px 5px"]} _hover={{background:"blue.500",borderRadius:"5px"}}  src="./image.png" alt="Upload Image" /></label>
              <Input onChange={handleFormData} name="image" id="inputFile" type="file" style={{display:"none"}} />
            </Box>
            <Button padding="3px 5px" size={["xs","sm","md"]} fontSize={["sm","md","lg"]} colorScheme="blue" variant="solid" isLoading={isLoading} loadingText="Creating Note..." onClick={handleCreateNote}>Create Note</Button>
          </Box>
        ) : null 
      }

      </Box>

      {/* Color and Image Background Pallete */}
      <Box marginLeft={["20px","30px","40px"]}>
        { showColorImageBox && isClicked ? <ColorImage /> : null }
      </Box>

    </Box>
  );
};

export default CreateNoteContainer;
