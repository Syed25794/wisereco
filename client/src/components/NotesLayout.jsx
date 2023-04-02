import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { NotesContext } from "../context/NoteContext"
import Note from "./Note";
import { DECREMENT_PAGE, INCREMENT_PAGE } from "../context/actionType";

export const NotesLayout = ()=>{
    const [state,dispatch]=useContext(NotesContext);
    const { notes, page } = state ; 


    const handlePage=(value)=>{
        switch(value){
          case 1:
            dispatch({type:INCREMENT_PAGE});
            break;
          case -1:
            dispatch({type:DECREMENT_PAGE});
            break;
          default :
            console.log("Default case");
        }
    }

    return (
        <Box>
            <Box display="flex" justifyContent="center" alignContent="center" gap={[2,4,6]}>
                <Button size={["xs","sm","md"]} fontSize={["xs","md","lg"]}  colorScheme="blue" onClick={()=>handlePage(1)} variant="solid" isDisabled={ notes?.length < 6 }>Next</Button>
                <Text color="red" marginTop={["2px","4px","6px"]} fontSize={["sm","md","lg"]} fontWeight="bold">{page}</Text>
                <Button size={["xs","sm","md"]} fontSize={["sm","md","lg"]}  colorScheme="blue" onClick={()=>handlePage(-1)} variant="solid" isDisabled = { page <= 1 } >Previous</Button>
            </Box>
            <SimpleGrid  columns={[1,1,2,2,3]} spacing={["10px","15px","15px"]} border="1px solid red" marginTop={["15px","20px","30px"]} padding="10px" >
                {notes?.map((note)=>{
                    return <Note data={note} key={note._id}  />
                })}
            </SimpleGrid>
        </Box>
    );
}