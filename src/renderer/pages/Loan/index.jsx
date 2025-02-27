import React, { useState, useEffect, createContext, useContext } from 'react';
import CardDataStats from '../../components/CardDataStats';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
//import { LoansList } from './components/Loans';
import { LoanCard } from './LoanCard';
import { DeleteIcon, MoneyBag, WalletIcon } from '../../components/Icons';
import { PaymentsList } from './PaymentsList';
import Pagination from '../../components/Pagination';
import Select from '../../components/Forms/SelectGroup/Select';

import { Link } from 'react-router-dom';
//import EditLoanModal from '../../Clients/Client/components/EditLoanModal';
import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import Tag from '../../components/Tag';

import { useDispatch, useSelector } from 'react-redux';
import { setLoan } from '../../redux/reducers/loans';
import { setPayments, setBruteGains, setExpiredPayments, setNetGains, setTotalPayments } from '../../redux/reducers/payments';

import { getLoan, getPayments, getPaymentsGains, getTotalPayments } from './funcs';

const Loan = () => {

  const loan = useSelector(state=>state.loans.loan)
  const bruteGains = useSelector(state=>state.payments.bruteGains)
  const netGains = useSelector(state=>state.payments.netGains)
  const totalPayments = useSelector(state=>state.payments.totalPayments)
  const dispatch = useDispatch()
  const { id } = useParams();
  
  const [expired, setExpired] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  const [dates, setDates] = useState([]);

  //const updatePayments = (payments) => setPayments(payments)
  //console.log(loanId)

  useEffect(() => {
   


    async function init(){

      try {
        const fetchLoan = await getLoan(id)
        console.log("fetchLoan---a>>",fetchLoan)
        
        dispatch(setLoan(fetchLoan))
  
  
        console.log("loan---a>>",loan)


        const payments = await getPayments(id, {
          limit: limit,
          offset: (page - 1) * limit,
          status:filter,
           
        } )

         console.log("payments---a>>",payments.payments)
  
        dispatch(setPayments(payments.payments))

        const total = await getTotalPayments(id,filter)
        dispatch(setTotalPayments(total))

        

        console.log("totalPayments---a>>",payments.total)
        setTotalPages(Math.ceil(payments.total / limit))



        //gains

        const fetchGains = await getPaymentsGains(id)
        console.log("fetchGains---a>>",fetchGains)

        dispatch(setBruteGains(fetchGains.brute_gains))
        dispatch(setNetGains(fetchGains.net_gains))
        
        
      } catch (error) {
        console.log("error---a>>",error)
      }
     

    /*  

      console.log("payments---a>>",payments)

      dispatch(setPayments(payments))
    } */
    }
    init()
    return () => {

    }
  }, [limit, page, filter,setPayments,dispatch])


  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  
  // console.log('Loan state in render:', loan); // Aquí se imprimirá el valor más actualizado


  function setState(state) {

    setLoan((prev) => {
      return {
        ...prev,
        state: state
      }
    })
  }

  function changePage(page) {
    setPage(page)
  }


  return (

<div>
        <Breadcrumb pageName="Prestamo" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Pagos Totales " total={totalPayments} rate="0.0%" levelUp>
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                fill=""
              />
              <path
                d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                fill=""
              />
            </svg>
          </CardDataStats>
          <CardDataStats title="Pagos Vencidos" total={expired} rate="0.0%" levelDown>
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                fill=""
              />
              <path
                d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                fill=""
              />
            </svg>
          </CardDataStats>
          <CardDataStats title="Ganancia actual" total={"$" + Intl.NumberFormat('de-DE').format(bruteGains)} rate="0.0%" levelUp>
            <MoneyBag></MoneyBag>
          </CardDataStats>

          <CardDataStats title="Dinero Recaudado" total={"$" + Intl.NumberFormat('de-DE').format( netGains)} rate="0.0%" levelUp>
            <MoneyBag></MoneyBag>
          </CardDataStats>

        </div>

        <div className=' bg-white my-6 flex justify-between items-center'>
          <div>

            {/* <button className='bg-primary text-sm text-white p-2 rounded-sm'>
            agregar pago
          </button> */}
          </div>
          <Select
            onChange={(e) =>{ setFilter(e.target.value); setPage(1)}}
            options={[{
              label: "todos",
              value: "",
              selected: true
            },
            {

              label: "Pagados",
              value: "paid",
              selected: false
            },
            {

              label: "Vencidas",
              value: "expired",
              selected: false
            }, {
              label: "Pendientes",
              value: "pending",
              selected: false
            },
            {
              label: "Incompletos",
              value: "incommpleted",
              selected: false
            }
            ]}>

          </Select>
          <Pagination currentPage={page} totalPages={totalPages} changePage={changePage}></Pagination>

        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 md:col-span-6 xl:col-span-4">

            
            <LoanCard  /> 
           

          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-8">
            <PaymentsList  />
          </div>
          {/* <ChatCard /> */}
            </div>
        </div>
  );
};






export default Loan;