import { Grid } from "@chakra-ui/react"
import { useContext } from "react"
import { NotesContext } from "../context/NoteContext"
import Note from "./Note";

export const NotesLayout = ()=>{
    const [state,]=useContext(NotesContext);
    const { notes } = state ; 
    // const GRID_ROW_HEIGHT = "200px";
    // function calculateNoteHeight(noteIndex) {
    //     // Get the note element by index
    //     const noteElement = document.querySelectorAll(".note")[noteIndex];
    
    //     console.log(noteElement);
    //     // Get the height of the note element including padding
    //     const height = noteElement.clientHeight;
      
    //     // Calculate the number of grid rows the note should span based on its height
    //     const gridRows = Math.ceil(height / GRID_ROW_HEIGHT);
      
    //     // Return the number of grid rows
    //     return gridRows;
    // }

    return (
        <Grid templateRows="repeat(2,1fr)" gridAutoColumns="max-content" templateColumns="repeat(3,1fr)" gap={6} border="1px solid red" margin="0px 10px 30px 10px" >
            {notes?.map((note)=>{
                return <Note data={note} key={note._id}  />
            })}
        </Grid>
    );
}