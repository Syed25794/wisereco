import { Box, Button, Image, Input } from "@chakra-ui/react";
// import { useState } from "react";



const InputBox = ({isClicked,setIsClicked,formData,setFormData}) => {
  // const [showColorImage,setShowColorImage]=useState(false);
  console.log(formData,process.env.CLOUD_NAME);

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

  

  return (
    <Box onClick={showInputs} width="680px" margin="auto" boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" borderRadius="9px" >
      <Box>
        {formData.image !== "" ? <Image height="300px" borderRadius="9px 9px 0px 0px" width="full" src={formData.image} alt="Image Preview" /> : null }
      </Box>
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
