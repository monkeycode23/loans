import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import  Tag  from "../../components/Tag"
  import{ WalletIcon,EditIcon,DeleteIcon, PaymentIcon, CalendarDateIcon, UserIcon, PercentageCircleIcon } from "../../components/Icons"
import DropdownDefault from "../../components/Dropdowns/DropdownDefault"
import EditLoanModal from "../../components/Loans/EditLoanModal"
import { deleteLoanDb } from "./funcs"

import { setNotes } from "../../redux/reducers/notes"


export const LoanCard = () => {

    const loan = useSelector(state=>state.loans.loan)
    const notes = useSelector(state=>state.notes)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
  /* 
    const loan = useSelector(state=>state.loans.loan)
    console.log(loan)
    const {amount, installment_number: installments, loan_date: date,
       status, label,nickname,  client_id } = loan
  
    
    
    const updateState=async()=>{
  
      const payed = payments.filter((e)=>e.state=="payed")
  
      if(payed.length == loan.installments) {
        
         await window.sqlite.query(`update loans set state='completed' where  id='${loanId}'`)
          stateState("completed")
         
        }
      
    }
  
    const navigate = useNavigate()
  
  useEffect(() => {
  
  
    const init = async () => {
   */
      
      /* console.log(payments)
        console.log("asdasdaukwgdb12geas")
         const payed = payments.filter((e)=>e.state=="payed")
  
        
        
        const isCompleted = payed.length == installments
  
         isCompleted ? await window.sqlite.query("UPDATE loans SET state ='completed' WHERE id='"+loanId+"'")
        
        : await window.sqlite.query("UPDATE loans SET state ='active' WHERE id='"+loanId+"'")
       */
           
    /* }
  
  
    init();
  
    return () => {
      
    }
  }, [])
   */
  
  
    
   
    
      return (
  <>
        {loan ? (
           
        <div className="max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        {/* Header */}
        <DropdownDefault >
   <EditLoanModal loan={loan} label={"Editar prestamo"} button={ <button 
      className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
      <EditIcon></EditIcon>
       Editar Prestamo
      </button>}>
      
     </EditLoanModal> 
    
      <button 
             onClick={async()=>{
              
              try {
               
                await deleteLoanDb(loan.id)

               

                navigate(-1) 
                 
              } catch (error) {
                console.log(error)
              }
              

             }}
             className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
              <DeleteIcon></DeleteIcon>
               Borrar Prestamo
             </button> 
      </DropdownDefault>
        <div className="flex justify-center  items-center">
          {/* Client Icon */}
          <div className="bg-blue-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
            <WalletIcon />
          </div>
          {/* Client Info */}
  
        </div>
        <div className="ml-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">{""}</h3>
  
        </div>
        {/* Divider */}
  
  
        <div className="my-4 border-t border-gray-200 text-center">{loan.label ? loan.label : "Prestamo"}</div>
  
  
        <p className='text-center text-success font-bold text-3xl '>$ {Intl.NumberFormat('es-ES').format(loan.amount)}
        </p>
        <p className="flex justify-between p-1">
          <span className="flex justify-center gap-2 items-center">
            <span className="flex justify-center items-center rounded-full bg-blue-500 text-white w-8 h-8">
            <PaymentIcon></PaymentIcon>
            </span>
          Cuotas 
          </span>
          <span className="flex justify-center items-center">
            {loan.installment_number}
          </span>
        </p>
        <p className="flex justify-between p-1">
          <span className="flex justify-center gap-2 items-center">
           <span className="flex justify-center items-center rounded-full bg-blue-500 text-white w-8 h-8">
            <CalendarDateIcon width={20} height={20}></CalendarDateIcon>
           </span>
          Fecha entrega 
          </span>
          <span className="flex justify-center items-center">
            {loan.loan_date}
          </span>
        </p>
        <p className="flex justify-between p-1">
          <span className="flex justify-center gap-2 items-center">
            <span className="flex justify-center items-center rounded-full bg-blue-500 text-white w-8 h-8">
            <UserIcon></UserIcon>
            </span>
          Cliente 
          </span>
          <span className="flex justify-center items-center">
            <Link to={"/clients/" + loan.client_id}><span className='text-bold text-lg text-black-2'> {loan.nickname}</span></Link>
          </span>
        </p>
        <p className="flex justify-between p-1">
          <span className="flex justify-center gap-2 items-center">
            <span className="flex justify-center items-center rounded-full bg-blue-500 text-white w-8 h-8">
            <PercentageCircleIcon></PercentageCircleIcon>
            </span>
          Interes 
          </span>
          <span>
            {loan.interest_rate}%
          </span>
        </p>
  
        <div className="my-4 border-t border-gray-200"></div>
        {/* Rating Section 
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Rating:</p>
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
          </div>
        </div>*/}
  
  
        {/* Action Button */}
        <div className="flex gap-1">
        
          {
            loan.status == "active" ?
              (<Tag type={"primary"} label={"activo"}></Tag>)
              : loan.status == "completed" ?
                (<Tag type={"success"} label={"completado"}></Tag>)
                :
                (<Tag type={"danger"} label={"cancelado"}></Tag>)
          }
  
          {/* cuotas pagas */}
         
        </div>
      </div>
        ) : (
          <>error al cargar los datos</>
        )}
        </>
      );
    
    
  };
  