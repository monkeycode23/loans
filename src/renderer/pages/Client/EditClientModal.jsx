
import React,{useState,useEffect} from 'react'
import Modal,{ useModal } from '../../components/Modal'
import { useNotification } from '../../components/Notifications'







function EditModalClient({button}) {
  // console.log(payment)
  
  return (
    
    <Modal buttonLabel={"edit"} title={"Editar Cliente"} button={button}>

        <EditClientForm  ></EditClientForm >
    </Modal>
  )
}

import { useSelector,useDispatch } from 'react-redux'
import { setClient } from '../../redux/reducers/clients'

function  EditClientForm({payment,button}){

    const client = useSelector((state)=>state.clients.client)
    const dispatch = useDispatch()
    const {setNotification,showNotification} = useNotification()
    const {toggleModal} = useModal()
  // console.log(payment)

    const [formData,setFormData] = useState({
        nickname:{
            value:client.nickname,
            error:"",
        },
        name:{
            value:client.name,
            error:"",
        },
        lastname:{
            value:client.lastname,
            error:"",
        },
        email:{
            value:client.email,
            error:"",
        },
        phonenumber:{
            value:client.phonenumber,
            error:"",
        },
        cbu:{
            value:client.cbu,
            error:"",
        },
        alias:{
            value:client.alias,
            error:"",
        }
    })


    useEffect(() => {
      
        
      return () => {
        
      }
    }, [formData])
    

    function setField({type,field,value}){
        
        if(type=="set"){
            console.log(value)
            setFormData((prev)=>{
                return {
                    ...prev,
                    [field]:{
                       
                        ...formData[field],
                        value:value,
                    },
                    
                }
            })
            console.log(formData[field])
        }

        if(type=="error"){
            setFormData((prev)=>{
                return {
                    ...prev,
                    [field]:{
                        
                        ...formData[field],
                        error:value,
                    },
                    
                }
            })
        }
       
    }


    return (
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>

                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Nickname (apodo)
                    </label>
                    <input
                        step={1000}
                        name="label"
                        type="text"
                        min={5000}
                        placeholder="Ingresa el monto del pago"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "nickname", value: e.target.value })}
                        defaultValue={formData.nickname.value}
                        value={formData.nickname.value}
                    />
                </div>
                <div className="mb-4">
                    <div className='flex'>
                        <div>
                            <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                                Nombre
                            </label>
                            <input
                                step={1000}
                                name="label"
                                type="text"
                                min={5000}
                                placeholder="Ingresa el monto del pago"
                                className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                onChange={(e) => setField({ type: "set", field: "name", value: e.target.value })}
                                defaultValue={formData.name.value}
                                value={formData.name.value}
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                                Apellido
                            </label>
                            <input
                                step={1000}
                                name="label"
                                type="text"
                                min={5000}
                                placeholder="Ingresa el monto del pago"
                                className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                onChange={(e) => setField({ type: "set", field: "lastname", value: e.target.value })}
                                defaultValue={formData.lastname.value}
                                value={formData.lastname.value}
                            />
                        </div>

                    </div>
                </div>

                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Email
                    </label>
                    <input

                        name="date"
                        type="email"
                        placeholder="email del cliente"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "email", value: e.target.value })}
                        defaultValue={formData.email.value}
                        value={formData.email.value} />
                </div>

                <div className='mb-4'>
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Numero de telefono
                    </label>
                    <input
                        step={1000}
                        name="label"
                        type="text"
                        min={5000}
                        placeholder="Ingresa el numero de telefono del cliente"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "phonenumber", value: e.target.value })}
                        defaultValue={formData.phonenumber.value}
                        value={formData.phonenumber.value}
                    />
                </div>


                <div className="mb-4">
                    <div className='flex'>
                        <div className='w-2/4'>
                            <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                                Alias
                            </label>
                            <input
                                step={1000}
                                name="label"
                                type="text"
                                min={5000}
                                placeholder="Ingresa el alias del pago"
                                className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                onChange={(e) => setField({ type: "set", field: "alias", value: e.target.value })}
                                defaultValue={formData.alias.value}
                                value={formData.alias.value}
                            />
                        </div>
                        <div className='w-3/4'>
                            <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                                Cbu
                            </label>
                            <input
                                step={1000}
                                name="label"
                                type="text"
                                min={5000}
                                placeholder="Ingresa el cbu del pago"
                                className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                onChange={(e) => setField({ type: "set", field: "cbu", value: e.target.value })}
                                defaultValue={formData.cbu.value}
                                value={formData.cbu.value}
                            />
                        </div>

                    </div>
                </div>

            <button
            onClick={(e)=>{
    
                    clientsModel.editClient(client.id,{
                        ...client,
                        nickname:formData.nickname.value,
                        name:formData.name.value,
                        lastname:formData.lastname.value,
                        email:formData.email.value,
                        phonenumber:formData.phonenumber.value,
                        alias:formData.alias.value,
                        cbu:formData.cbu.value,
                    })
                    
                    toggleModal()
                    setNotification({
                        type:"success",
                        message:"Cliente actualizado con exito"
                    })
                    showNotification()
                   // console.log(payment)
                    setClient({
                        ...client,
                        nickname:formData.nickname.value,
                        name:formData.name.value,
                        lastname:formData.lastname.value,
                        email:formData.email.value,
                        phonenumber:formData.phonenumber.value,
                        alias:formData.alias.value,
                        cbu:formData.cbu.value,
                    })
                    
                }
            }
            className='p-3 bg-primary text-white'>
                editar
            </button>
            </form>
        </div>
    )
}

/* 

function Amount() {
    
  return (
    <div className="mb-4">
    <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Cunato dinero  deseas prestar?
    </h3>
    <div className="relative">
        <input
            step={1000}
            name="monto"
            type="number"
            min={5000}
            placeholder="Ingresa el monto del prestamo"
            className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            onChange={ (e)=>setField({type:"set",field:"monto",value:e.target.value})}
            defaultValue={10000}
            value={formData.monto.value}
        />

        <div className='flex  mt-5 mb-5 gap-2'>
            {
                montos.map((e) => <span

                    onClick={(e) => {
                       setField({type:"set",field:"monto",value:Number(e.target.innerText)})  
                    }}
                    className='text-sm p-2  border border-stroke  text-center cursor-pointer rounded-lg'
                >
                    {e}</span>)
            }
        </div>

        <p className="text-center text-red ">
    {
      formData.monto.error ? formData.monto.error : ""
    }
  </p>

    </div>
</div>
  )
}

export default EditModalPayment */
export default EditModalClient