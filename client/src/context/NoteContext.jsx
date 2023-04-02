import { createContext , useCallback, useReducer } from 'react';
import { GET_NOTE_ERROR, GET_NOTE_LOADING, GET_NOTE_SUCCESS, ISCLICKED_FALSE, POST_NOTE_ERROR, POST_NOTE_LOADING, POST_NOTE_SUCCESS, RESET_FORM_DATA } from './actionType';
import { Reducer } from './Reducer';


//Initial State
const initState={
    notes:[],
    page:1,
    isLoadingNotes:false,
    isSuccessNotes:false,
    isErrorNotes:false,
    isLoadingPost:false,
    isSuccessPost:false,
    isErrorPost:false,
    isPopUpOpen:false,
    formData:{
        title:"",
        tagline:"",
        text:"",
        image:"",
        isPinned:false,
        background_color:""
    },
    setImage:false,
    isClicked:false,
    showColorImageBox:false,
    showNotes:false
}

//Creating Context for Notes
export const NotesContext = createContext();

export default function NotesContextProviderWrapper({children}){
    const [state,dispatch]=useReducer(Reducer,initState);

    //Notes creating function 
    const createNote=async()=>{
        dispatch({type:POST_NOTE_LOADING});
        try {
          const response = await fetch("https://wisereco.onrender.com/notes/createNote",{
            method:"POST",
            body:JSON.stringify(state.formData),
            headers:{"Content-Type":"application/json"}
          });
          const result = await response.json();
          console.log(result,"result");
          dispatch({type:POST_NOTE_SUCCESS,payload:result.createdNote});
        } catch (error) {
            dispatch({type:POST_NOTE_ERROR,payload:error.message});
        }
        getNotes();
        dispatch({type:ISCLICKED_FALSE});
        dispatch({type:RESET_FORM_DATA});
    }

    //Notes fetching function
    const getNotes = useCallback(async()=>{
        dispatch({type:GET_NOTE_LOADING});
        try {
            const response = await fetch(`https://wisereco.onrender.com/notes/getNotes?page=${state.page}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            });
            const result = await response.json();
            dispatch({type:GET_NOTE_SUCCESS,payload:result.result});
        } catch (error) {
            dispatch({type:GET_NOTE_ERROR,payload:error.message});
        }
    },[state.page]);
    
    //Defining Context
    return (
    <NotesContext.Provider value={[state,dispatch,createNote,getNotes]}>
        {children}
    </NotesContext.Provider>
    );
}