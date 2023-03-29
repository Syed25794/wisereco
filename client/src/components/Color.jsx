import { Box } from "@chakra-ui/react"

const Color=({object,handleColor})=>{
  return <Box onClick={()=>handleColor(object.color)} width="40px" height="40px" backgroundColor={object.color} borderRadius="50%" _hover={{borderRadius:"50%",border:"1px solid black"}}></Box>
}

export default Color;