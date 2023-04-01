import { DECREMENT_PAGE, GET_NOTE_ERROR, GET_NOTE_LOADING, GET_NOTE_SUCCESS, INCREMENT_PAGE, ISCLICKED_FALSE, ISCLICKED_TRUE, POST_NOTE_ERROR, POST_NOTE_LOADING, POST_NOTE_SUCCESS, RESET_BACKGROUND_IMAGE, RESET_FORM_DATA, RESET_IMAGE, SET_BACKGROUND_COLOR, SET_BACKGROUND_IMAGE, SET_FORM_DATA, SET_IMAGE, SET_IMAGE_FALSE, SET_IMAGE_TRUE, SET_ISPINNED, SHOW_COLOR_IMAGE_FALSE, SHOW_COLOR_IMAGE_TRUE, SHOW_NOTES_FALSE, SHOW_NOTES_TRUE } from "./actionType";

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
                    background:payload
                }
            }
        case SET_BACKGROUND_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    background:payload
                }
            }
        case RESET_BACKGROUND_IMAGE:
            return {
                ...state,
                formData:{
                    ...state.formData,
                    background:""
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
                formData:{
                    title:"",
                    tagline:"",
                    text:"",
                    isPinned:false,
                    background:"",
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
                isLoading:true,
                isError:false,
                isSuccess:false
            }
        case GET_NOTE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isSuccess:true,
                isError:false,
                notes:payload
            }
        case GET_NOTE_ERROR:
            return {
                ...state,
                isLoading:false,
                isSuccess:false,
                isError:true
            }
        case POST_NOTE_LOADING:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isSuccess:false
            }
        case POST_NOTE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isSuccess:true,
                isError:false,
                notes:[...state.notes,payload]
            }
        case POST_NOTE_ERROR:
            return {
                ...state,
                isLoading:false,
                isSuccess:false,
                isError:true
            }
        case SHOW_NOTES_TRUE:
            return {
                ...state,
                showNotes:true
            }
        case SHOW_NOTES_FALSE:
            return {
                ...state,
                showNotes:false
            }
        default : 
            return state;
    }
}