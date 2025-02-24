


import React, { useState } from 'react'
import Modal from "../../components/Modal"
import { useModal } from '../../components/Modal'
import {useNotification} from "../../components/Notifications"
import { useSelector,useDispatch } from "react-redux";

import { setPayments } from '../../redux/reducers/payments.jsx';


function IncompleteModal({payment,button}) {

    const {setNotification,showNotification} = useNotification()

  return (
    <Modal title={"Pago incompleto"} button={button}>
        <FormModal payment={payment} >

        </FormModal>
    </Modal>
  )
}



function FormModal({payment}) {

    console.log(payment)

   // const {setPayments} = useTodayPayments()
    
    const {toggleModal} = useModal()
    const [monto,setMonto] = useState()

   /*  async function onClick(e) {
        console.log("asdasd")
        console.log(payment)
        await paymentsModel.editPayment(payment.paymentId,{
            state:"incomplete",
            incomplete_amount:monto,
            payed_date:"NULL",
            motes:`pago incompleto,monto pagado ${monto} resta por pagar ${12} para completar el pago (los pagos incompletos no estan acoplados al calculo de la ganancia)`
        })

        setPayments((prev)=>prev.map((e)=>{

            if(e.paymentId==payment.paymentId){
                return {
                    ...e,
                    state:"incomplete",
                    
                }
            }else{
                return e
            }
        }))


        toggleModal()

       /*  setNotification({
            type:"warning",
            message:"Pago marcado como incompleto"
        })
        showNotification() */
    /*} */

  return (
   <>
    <form onSubmit={(e)=>e.preventDefault()}>
    <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        monto 
                    </label>
                    <input
                        step={1000}
                        name="label"
                        type="number"
                        max={payment.amount}
                        placeholder="Ingresa el monto del pago"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) =>setMonto(e.target.value)}
                        defaultValue={monto}
                        value={monto}
                    />
                </div>

            <button onClick={()=>{}} className='p-3 rounded-sm bg-primary text-white'>finalizar</button>
    </form>
   </>
  )
}



export default IncompleteModal