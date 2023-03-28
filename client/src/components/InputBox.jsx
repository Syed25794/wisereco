import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const InputBox = ({isClicked,setIsClicked}) => {
  console.log(isClicked);
  const [formData,setFormData]=useState({ title:"", tagline:"", body:""});

  const handleFormData=(e)=>{
    const { name, value } = e.target;
    setFormData({...formData,[name]:value});
  }
  const showInputs = (e)=>{
    e.stopPropagation();
    setIsClicked(true);
  }

  return (
    <Box onClick={showInputs} width="580px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius="9px" >
      {isClicked ? <Input focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="title" value={formData.title} placeholder="Enter Title of the note" required/> : null }
      {isClicked ? <Input focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="tagline" value={formData.tagline} placeholder="Enter Tagline..." required/> : null }
      <Input focusBorderColor="white" border="none" onChange={handleFormData} type="text" name="body" vallue={formData.body} placeholder="Take a note..." required/>
    </Box>
  );
};

export default InputBox;
