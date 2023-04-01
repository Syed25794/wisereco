import { Box, Divider } from '@chakra-ui/react'
import data from './../images/images.json';
import Color from './Color';
import ImageComponent from './ImageComponent';

const ColorImage = () => {
    //Background color and Image Showing Pallete
  return (
    <Box width={["250px","300px","475px"]} padding="5px" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" zIndex="3" >

        {/* Background Color Box */}
        <Box display="flex" gap={["1.5px","2px","2px"]} marginBottom="5px">
            {data.colors.map((color)=>{
                return <Color key={color.id} object={color} />
            })}
        </Box>

        <Divider orientation="horizontal" size="5px" colorScheme="gray" />

        {/* Background Image Box */}
        <Box display="flex" gap={["2px","1.5px","2px"]} marginTop="5px">
            {data.images.map((image)=>{
                return <ImageComponent key={image.id} url={image.url} text={image.description} />
            })}
        </Box>
    </Box>
  )
}

export default ColorImage