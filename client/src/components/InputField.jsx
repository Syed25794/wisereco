import { Input } from "@chakra-ui/react"
import { useContext } from "react"
import { ISCLICKED_TRUE, SET_FORM_DATA } from "../context/actionType";
import { NotesContext } from "../context/NoteContext"

export const InputField = ({type,name,value,placeholder})=>{
    const [state,dispatch]=useContext(NotesContext);
    const { formData } = state ; 

    //handling text input 
    const handleFormData=(e)=>{
        e.stopPropagation();
        dispatch({type:ISCLICKED_TRUE});
        const { name, value } = e.target;
        dispatch({type:SET_FORM_DATA,payload:{name,value}});
    }

    //Input customized component
    return (
        <Input autoComplete="off" size={["xs","md","lg"]} fontSize={["sm","md","lg"]} focusBorderColor={formData.background_color === "" ? "white" : `${formData.background_color}`} outline="none" border="none" onChange={handleFormData} type={type} name={name} value={value} placeholder={placeholder} required/>
    )
}