import { createContext , useReducer } from 'react';
import { Reducer } from './Reducer';

const initState={
    notes:[],
    page:1,
    isLoading:false,
    isSuccess:false,
    isError:false,
    formData:{
        title:"",
        tagline:"",
        text:"",
        image:"",
        isPinned:false,
        background:""
    },
    setImage:false,
    isClicked:false,
    showColorImageBox:false
}

export const NotesContext = createContext();

export default function NotesContextProviderWrapper({children}){
    const [state,dispatch]=useReducer(Reducer,initState);

    const createNote=async()=>{
        try {
          const response = await fetch("http://localhost:8080/notes/createNote",{
            method:"POST",
            body:JSON.stringify(state.formData),
            headers:{"Content-Type":"application/json"}
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.log(error.message);
        }
        // setFormData({title:"",tagline:"",text:"",image:"",isPinned:false,background_color:""});
    }

    const getNotes = async () =>{
        try {
            const response = await fetch(`http://localhost:8080/notes/getNotes?page=${state.page}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <NotesContext.Provider value={[state,dispatch,createNote,getNotes]}>
        {children}
    </NotesContext.Provider>
    );
}