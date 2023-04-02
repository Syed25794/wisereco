import { DECREMENT_PAGE, DELETE_NOTE_ERROR, DELETE_NOTE_LOADING, DELETE_NOTE_SUCCESS, GET_ALL_INPUTS, GET_NOTE_ERROR, GET_NOTE_LOADING, GET_NOTE_SUCCESS, INCREMENT_PAGE, ISCLICKED_FALSE, ISCLICKED_TRUE, POPULATE_FORM_DATA, POST_NOTE_ERROR, POST_NOTE_LOADING, POST_NOTE_SUCCESS, RESET_ALL_INPUTS, RESET_BACKGROUND_IMAGE, RESET_DELETE_FLAGS, RESET_FORM_DATA, RESET_IMAGE, RESET_POST_FLAGS, RESET_UPDATE_FLAGS, SET_BACKGROUND_COLOR, SET_BACKGROUND_IMAGE, SET_FORM_DATA, SET_IMAGE, SET_IMAGE_FALSE, SET_IMAGE_TRUE, SET_ISPINNED, SHOW_COLOR_IMAGE_FALSE, SHOW_COLOR_IMAGE_TRUE, UPDATE_NOTE_ERROR, UPDATE_NOTE_LOADING, UPDATE_NOTE_SUCCESS } from "./actionType";

//Reducer function 
export const Reducer = ( state, action )=>{
    const { type, payload } = action ;
    switch( type ){
        case ISCLICKED_TRUE:
            return {
                ...state,
                isClicked:true
            }
        case ISCLICKED_FALSE:
            return {
                ...state,
                isClicked:false
            }
        case SHOW_COLOR_IMAGE_TRUE:
            return {
                ...state,
                showColorImageBox:true
            }
        case SHOW_COLOR_IMAGE_FALSE:
            return {
                ...state,
                showColorImageBox:false
            }
        case SET_IMAGE_TRUE:
            return {
                ...state,
                setImage:true
            }
        case SET_IMAGE_FALSE:
            return {
                ...state,
                setImage:false
            }
        case SET_ISPINNED:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    isPinned:!payload
                }
            }
        case SET_BACKGROUND_COLOR:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    background_color:payload
                }
            }
        case SET_BACKGROUND_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    background_color:payload
                }
            }
        case RESET_BACKGROUND_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    background_color:""
                }
        }
        case SET_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    image:payload
                }
            }
        case RESET_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    image:""
                }
            }
        case SET_FORM_DATA:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    [payload.name]:payload.value
                }
            }
        case RESET_FORM_DATA:
            return {
                ...state,
                isPopUpOpen:false,
                formData:{
                    title:"",
                    tagline:"",
                    text:"",
                    isPinned:false,
                    background_color:"",
                    image:""
                }
            }
        case INCREMENT_PAGE:
            return {
                ...state,
                page:state.page + 1
            }
        case DECREMENT_PAGE:
            return {
                ...state,
                page:state.page - 1 
            }
        case GET_NOTE_LOADING:
            return {
                ...state,
                isLoadingNotes:true,
                isErrorNotes:false,
                isSuccessNotes:false
            }
        case GET_NOTE_SUCCESS:
            return {
                ...state,
                isLoadingNotes:false,
                isSuccessNotes:true,
                isErrorNotes:false,
                notes:payload
            }
        case GET_NOTE_ERROR:
            return {
                ...state,
                isLoadingNotes:false,
                isSuccess:false,
                isError:true
            }
        case POST_NOTE_LOADING:
            return {
                ...state,
                isLoadingPost:true,
                isErrorPost:false,
                isSuccessPost:false
            }
        case POST_NOTE_SUCCESS:
            return {
                ...state,
                isLoadingPost:false,
                isSuccessPost:true,
                isErrorPost:false
            }
        case POST_NOTE_ERROR:
            return {
                ...state,
                isLoadingPost:false,
                isSuccessPost:false,
                isErrorPost:true
            }
        case DELETE_NOTE_LOADING:
            return {
                ...state,
                isLoadingDelete:true,
                isSuccessDelete:false,
                isErrorDelete:false
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                isLoadingDelete:false,
                isSuccessDelete:true,
                isErrorDelete:false,
                notes:state.notes?.filter((note)=> note._id !== payload )
            }
        case DELETE_NOTE_ERROR:
            return {
                ...state,
                isLoadingDelete:false,
                isSuccessDelete:false,
                isErrorDelete:true
            }
        case POPULATE_FORM_DATA:
            return {
                ...state,
                isPopUpOpen:true,
                formData:{
                    title:payload.title,
                    tagline:payload.tagline,
                    text:payload.text,
                    isPinned:payload.isPinned,
                    background_color:payload.background_color,
                    image:payload.image
                }
            }
        case UPDATE_NOTE_LOADING:
            return {
                ...state,
                isLoadingUpdate:true,
                isErrorUpdate:false,
                isSuccessUpdate:false
            }
        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                isLoadingUpdate:false,
                isErrorUpdate:false,
                isSuccessUpdate:true
            }
        case UPDATE_NOTE_ERROR:
            return {
                ...state,
                isLoadingUpdate:false,
                isErrorUpdate:true,
                isSuccessUpdate:false
            }
        case RESET_POST_FLAGS:
            return {
                ...state,
                isLoadingPost:false,
                isErrorPost:false,
                isSuccessPost:false
            }
        case RESET_DELETE_FLAGS:
            return {
                ...state,
                isLoadingDelete:false,
                isErrorDelete:false,
                isSuccessDelete:false
            }
        case RESET_UPDATE_FLAGS:
            return {
                ...state,
                isLoadingUpdate:false,
                isErrorUpdate:false,
                isSuccessUpdate:false
            }
        case GET_ALL_INPUTS:
            return {
                ...state,
                isValidInputs:false
            }
        case RESET_ALL_INPUTS:
            return {
                ...state,
                isValidInputs:true
            }
        default : 
            return state;
    }
}