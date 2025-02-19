
import React,{useState,useReducer, useEffect} from "react"



function reducer(state, action) {

   
    if (action.type === 'set') {
      return {
        ...state,
        [action.field]:{  
            ...state[action.field],
            error:"",
            isValid:true,
            value:action.value
          }
        
      };

    }
    if (action.type === 'error') {
        return {
          ...state,
          [action.field]:{
            ...state[action.field],
            isValid:false,
            error:action.error
          }
          
        };
        
      }
      
      if (action.type === 'validate') {
        return {
          ...state,
          [action.field]:{
            ...state[action.field],
            error:"",
            isValidated:true
          }
          
        };
        
      }
    throw Error('Unknown action.');
  }
  
  const validationsFuncs={
   
    minLength:(value,param)=> value.length>=param,
    maxLength:(value,param)=>value.length<=param,
    required:(value)=>value.length>0,
    email:(value)=>/^[\w\.-]+@[\w-]+\.[\w-]{2,}$/.test(value),
    match:(value,param)=>value==param,
    phonenumber:(phone) =>{
      const regex = /^(?:\+54|54)?(9?[1-9]\d{1,4})?([6-8]\d{6,7})$/;
      return regex.test(phone);
    }
}

const errMessages = {
    minLength:"Este campo tiene que ser mayor a  ? ",
    maxLength:"Este campo tiene que ser menor a  ? ",
    require:"Este campo es requerido ",
    email:"Este campo debe ser una direccion de email valida"
} 

export default   function useValidate(values){

   /*  const [errors,setErrors] = useState({})*/
    const [isValidated,setIsValidated] = useState(true) 
    const [fields, dispatch] = useReducer(reducer,values);

    
    function validate(validations){

        const errors ={}

        for (const field in validations) {
               
            const input= validations[field]

            const value = fields[field].value || ''
            
           // console.log(value)
           
            for (const validation in validations[field]) {
                 
                const currentValidation = input[validation]
                
                const param = currentValidation.param;

                const isValid = validationsFuncs[validation](value,param)
               
                if(!isValid) {
                    errors[field]=false
                   
                    dispatch({type:"error",field:field,error:currentValidation.message || errMessages[validation].replace("?",param || '')})
                           
                    break
                }else{
                    delete errors[field]
                    dispatch({type:"validate",field:field})

                }
             
                   

                }    
            }

       //  console.log(errors)
            
            return Object.keys(errors).length==0
            
        }
        

        return {
    
            validate,
            //errors,
            fields,
            setField:dispatch
        }
    }

   
    
    
