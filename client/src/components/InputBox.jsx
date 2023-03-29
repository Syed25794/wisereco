import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useState } from "react";
import ColorImage from "./ColorImage";



const InputBox = ({isClicked,setIsClicked,formData,setFormData,setShowColorImage,showColorImage}) => {
  const [isImage,setIsImage]=useState(false);
  console.log(formData);

  const handleFormData=(e)=>{
    e.stopPropagation();
    setIsClicked(true);
    const { name, value } = e.target;
    if( name === "image" ){
      const file = e.target.files[0];
      TransformFile(file);
    }
    if( name === "isPinned" ){
      setFormData({...formData,isPinned:!formData.isPinned });
    }else{
      setFormData({...formData,[name]:value});
    }
  }

  const TransformFile=(file)=>{
    const reader = new FileReader();
      if( file ){
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
          console.log(reader.result);
          setFormData({...formData,image:reader.result});
        };
      }else {
        setFormData({...formData,image:""});
      }
  }

  const showInputs = (e)=>{
    e.stopPropagation();
    setIsClicked(true);
  }

  const handleShowPalatte=(e)=>{
    e.stopPropagation();
    setShowColorImage(true);
  }

  const handleColor=(color)=>{
    setFormData({...formData,background_color:color});
    setShowColorImage(false);
    setIsImage(false);
  }

  const deleteImage=()=>{
    setFormData({...formData,image:""});
  }

  const handleBackgroungImage=(url)=>{
    setFormData({...formData,background_color:url});
    setIsImage(true);
    setShowColorImage(false);
  }
  

  return (
    <Box onClick={showInputs} position="relative" width="680px" height="300px" left="300px">
      <Box boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" position="absolute" zIndex="2" overflow="hidden" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundColor={ !isImage ? formData.background_color :"white"} backgroundImage={isImage ? `url(${formData.background_color})` : null}>
      <Box>
        {formData.image !== "" ? <Box zIndex="10"><Image height="300px" borderRadius="9px 9px 0px 0px" width="full" src={formData.image} alt="Image Preview" /></Box> : null }
        {formData.image !== "" ? <Box onClick={deleteImage} width="50px" height="50px" _hover={{backgroundColor:"red"}} border="1px solid red" marginTop="-60px" marginLeft="620px" zIndex="1"><Image height="40px" widht="40px" src='./trash.png' alt="Trash" /></Box> : null }
      </Box>
      <Box display="flex" gap="15px" padding="2px 3px" marginTop={formData.image !== "" ? "20px" : "0px"} >
        <Box width="595px" wordBreak="break-all" >
          {isClicked ? <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="title" value={formData.title} placeholder="Enter Title of the note" required/> : null }
          {isClicked ? <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="tagline" value={formData.tagline} placeholder="Enter Tagline..." required/> : null }
          <Input  focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="body" vallue={formData.body} placeholder="Take a note..." required/>
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
        <Button colorScheme="blue" variant="solid">Create Note</Button>
      </Box>) : null }
      </Box>
      <Box zIndex="1" position="absolute" left="40px" top={formData.image !== "" ? "495px" : "180px"}>
        {showColorImage && isClicked ? <ColorImage handleColor={handleColor} handleBackgroungImage={handleBackgroungImage} /> : null }
      </Box>
    </Box>
  );
};

export default InputBox;
