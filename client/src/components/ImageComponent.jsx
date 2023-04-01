import { Image } from '@chakra-ui/react';
import { useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import { SET_BACKGROUND_IMAGE, SET_IMAGE_TRUE, SHOW_COLOR_IMAGE_FALSE } from '../context/actionType';

const ImageComponent = ({url,text}) => {
  const [,dispatch]=useContext(NotesContext);
  //handling backgroud Image Url
  const handleBackgroungImage=(url)=>{
    dispatch({type:SET_BACKGROUND_IMAGE,payload:url})
    dispatch({type:SET_IMAGE_TRUE});
    dispatch({type:SHOW_COLOR_IMAGE_FALSE});
  }
  //Background Image componenet
  
  return <Image onClick={()=>handleBackgroungImage(url)} width={["25px","31px","50px"]} height={["25px","31px","50px"]} borderRadius="50%"  _hover={{border:"1px solid black",borderRadius:"50%" }} src={url} alt={text} />
}

export default ImageComponent;