import { Image } from '@chakra-ui/react';

const ImageComponent = ({url,text,handleBackgroungImage}) => {
  return <Image onClick={()=>handleBackgroungImage(url)} width="50px" height="50px" borderRadius="50%" _hover={{border:"1px solid black",borderRadius:"50%"}} src={url} alt={text} />
}

export default ImageComponent;