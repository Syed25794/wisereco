import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useState } from "react";

const InputBox = ({isClicked,setIsClicked,formData,setFormData}) => {
  const [showColorImage,setShowColorImage]=useState(false);
  console.log(formData);

  const handleFormData=(e)=>{
    e.stopPropagation();
    setIsClicked(true);
    const { name, value } = e.target;
    if( name === "image" ){
      console.log(e.target.files[0].name);
    }
    if( name === "isPinned" ){
      setFormData({...formData,isPinned:!formData.isPinned });
    }else{
      setFormData({...formData,[name]:value});
    }
  }

  const showInputs = (e)=>{
    e.stopPropagation();
    setIsClicked(true);
  }

  

  return (
    <Box onClick={showInputs} width="680px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius="9px" >
      <Box display="flex" gap="15px" padding="2px 3px" >
        <Box width="595px" wordBreak="break-all" >
          {isClicked ? <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="title" value={formData.title} placeholder="Enter Title of the note" required/> : null }
          {isClicked ? <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="tagline" value={formData.tagline} placeholder="Enter Tagline..." required/> : null }
          <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="body" vallue={formData.body} placeholder="Take a note..." required/>
        </Box>
        <Box>
          {isClicked ? <Image onClick={handleFormData} name="isPinned" borderRadius="5px" backgroundColor={formData.isPinned ? "blue.500" :"none"} width="50px" padding="3px 5px" height="48px"  src="./pin.png" alt="Pinned Note" /> : null }
        </Box>
      </Box>
      
      {isClicked ? (<Box display="flex" justifyContent="space-between" margin="5px 15px">
        <Box display="flex" gap="10px">
          <Image width="50px" padding="3px 5px" _hover={{background:"blue.500",borderRadius:"5px"}}  src="./palette.png" alt="Drawing Plate" />
          <label htmlFor="inputFile"><Image width="50px" padding="3px 5px" _hover={{background:"blue.500",borderRadius:"5px"}}  src="./image.png" alt="Upload Image" /></label>
          <Input onChange={handleFormData} name="image" id="inputFile" type="file" style={{display:"none"}} />
        </Box>
        <Button colorScheme="blue" variant="solid">Create Note</Button>
      </Box>) : null }
    </Box>
  );
};

export default InputBox;
