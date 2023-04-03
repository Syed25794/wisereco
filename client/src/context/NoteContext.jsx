import { createContext , useCallback, useReducer } from 'react';
import { GET_ALL_INPUTS, GET_NOTE_ERROR, GET_NOTE_LOADING, GET_NOTE_SUCCESS, ISCLICKED_FALSE, POST_NOTE_ERROR, POST_NOTE_LOADING, POST_NOTE_SUCCESS, RESET_ALL_INPUTS, RESET_FORM_DATA, RESET_POST_FLAGS } from './actionType';
import { Reducer } from './Reducer';


//Initial State
const initState={
    notes:[],
    page:1,
    isValidInputs:true,
    isLoadingNotes:false,
    isSuccessNotes:false,
    isErrorNotes:false,
    isLoadingPost:false,
    isSuccessPost:false,
    isErrorPost:false,
    isLoadingUpdate:false,
    isSuccessUpdate:false,
    isErrorUpdate:false,
    isLoadingDelete:false,
    isSuccessDelete:false,
    isErrorDelete:false,
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
    showColorImageBox:false
}

//Creating Context for Notes
export const NotesContext = createContext();

export default function NotesContextProviderWrapper({children}){
    const [state,dispatch]=useReducer(Reducer,initState);

    //Notes creating function 
    const createNote=async()=>{
        if( state.formData.title === "" || state.formData.tagline === "" || state.formData.text === "" ){
            dispatch({type:GET_ALL_INPUTS});
            setTimeout(()=>{
                dispatch({type:RESET_ALL_INPUTS})
            },2000);
        }else{
            dispatch({type:POST_NOTE_LOADING});
            try {
            const response = await fetch("https://wisereco.onrender.com/notes/createNote",{
                method:"POST",
                body:JSON.stringify(state.formData),
                headers:{"Content-Type":"application/json"}
            });
            const result = await response.json();
            dispatch({type:POST_NOTE_SUCCESS,payload:result.createdNote});
            } catch (error) {
                dispatch({type:POST_NOTE_ERROR,payload:error.message});
            }
            getNotes();
            dispatch({type:ISCLICKED_FALSE});
            dispatch({type:RESET_FORM_DATA});
            setTimeout(()=>{
                dispatch({type:RESET_POST_FLAGS});
            },3000)
        }
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