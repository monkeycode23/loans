
import React,{useState,useEffect} from 'react'
import Modal,{ useModal } from '../../components/Modal'
import { PaymentIcon } from '../../components/Icons'

import { StateTag } from './PaymentsList'

import { formatAmount } from '../../common/funcs'
import { formatDateDifference } from '../../common/funcs'

import { getNotes } from './funcs'
import { useSelector,useDispatch   } from 'react-redux'
import { setNotes } from '../../redux/reducers/notes'
function PaymentModal({payment,button}) {
   //console.log(payment)
   //const [notes,setNotes] = useState([])
   const notes = useSelector(state=>state.notes.notes)
   const dispatch = useDispatch()

   useEffect(()=>{
    const init = async ()=>{
        const notes = await getNotes(payment.id,"payment")
        console.log("notes---a>>",notes)
        dispatch(setNotes(notes))

    }
    init()
   },[])
  
  return (
    
    <Modal buttonLabel={"ver"} title={payment.label} button={button}>
        <div className='flex gap-3'>

          <div className="bg-lime-500 text-white w-30 h-30 flex flex-row justify-center items-center rounded-full">
                     <PaymentIcon width={33} height={33}/>
           </div>

            <div className='flex flex-col gap-4'>
            
            <div className='w-full'>
                <span className='text-center text-3xl text-green-500'>{"$"+formatAmount(payment.amount)} </span>
                <span>{"(ganancia $"+payment.gain+")"}</span>
            </div>
            <div className='w-full'>
                <span className='text-md text-black'>{payment.payment_date} {payment.status=="paid" ? new Date(payment.payment_date)> new Date() ? "pago adelantado":"pagado hace" : 
                    payment.status=="pending" ? "se paga en " : payment.status=="expired" ? "atrasado hace " : ""
                    } {formatDateDifference(payment.payment_date)}</span>
            </div>
            <div className='w-full'>
                <StateTag state={payment.status}>

                </StateTag>
                
            </div >
           
          
           </div>

         
           
       </div>

       <div>
              <span className='text-md text-md text-black'>Notas:   {notes ?
              Array.isArray(notes) ? notes.map((e)=>e.notes).join("\n") : notes
              : "sin notas..."}</span>
            </div>
  
    </Modal>
  )
}








export default PaymentModal