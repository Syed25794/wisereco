import { createContext , useCallback, useReducer } from 'react';
import { GET_NOTE_ERROR, GET_NOTE_LOADING, GET_NOTE_SUCCESS, ISCLICKED_FALSE, POST_NOTE_ERROR, POST_NOTE_LOADING, POST_NOTE_SUCCESS, RESET_FORM_DATA } from './actionType';
import { Reducer } from './Reducer';

const initState={
    notes:[],
    page:1,
    isLoadingNotes:false,
    isSuccessNotes:false,
    isErrorNotes:false,
    isLoading:false,
    isSuccess:false,
    isError:false,
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
    showNotes:false,
    showCreateColorImagePalette:false,
    showNoteColorImagePalette:false
}

export const NotesContext = createContext();

export default function NotesContextProviderWrapper({children}){
    const [state,dispatch]=useReducer(Reducer,initState);

    const createNote=async()=>{
        dispatch({type:POST_NOTE_LOADING});
        console.log(state.formData,"inside");
        try {
          const response = await fetch("http://localhost:8080/notes/createNote",{
            method:"POST",
            body:JSON.stringify(state.formData),
            headers:{"Content-Type":"application/json"}
          });
          const result = await response.json();
          dispatch({type:POST_NOTE_SUCCESS,payload:result.createdNote});
          console.log(result);
        } catch (error) {
            dispatch({type:POST_NOTE_ERROR,payload:error.message});
        }
        dispatch({type:ISCLICKED_FALSE});
        dispatch({type:RESET_FORM_DATA});
    }

    const getNotes = useCallback(async()=>{
        console.log("loading notes...");
        dispatch({type:GET_NOTE_LOADING});
        try {
            const response = await fetch(`http://localhost:8080/notes/getNotes?page=${state.page}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            });
            const result = await response.json();
            dispatch({type:GET_NOTE_SUCCESS,payload:result.result});
        } catch (error) {
            dispatch({type:GET_NOTE_ERROR,payload:error.message});
        }
    },[state.page]);
    
    return (
    <NotesContext.Provider value={[state,dispatch,createNote,getNotes]}>
        {children}
    </NotesContext.Provider>
    );
}