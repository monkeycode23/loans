import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardDataStats from '../../components/CardDataStats';
import { WalletIcon } from '../../components/Icons';
import { MoneyBag } from '../../components/Icons';
import { DollarSign } from '../../components/Icons';
import ChartThree from '../../components/Charts/ChartThree';
import { formatAmount } from '../../common/funcs';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartOne from '../../components/Charts/ChartOne';
import { getTotalLoans,getLoansTotalAmounts,getTotalPaidPaymentsMoney } from './funcs';
import { useDispatch } from 'react-redux';
import { setTotalLoans,setTotalClients,setTotalPayments,
  setTotalLoansMoney,setTotalPaidPaymentsMoney,
  setTotalLoansGains,setTotalPaidPaymentsGains,
  setTotalPaidPaymentsNetGains } from '../../redux/reducers/dashboard';
import { toLocaleDate } from '../Payments/funcs';



const Dashboard = () => {

    const dispatch = useDispatch()
    const loans = useSelector(state => state.loans.loans)

    const totalLoans = useSelector(state => state.dashboard.totalLoans)
    const totalLoansMoney = useSelector(state => state.dashboard.totalLoansMoney)
    const totalPaidPaymentsMoney = useSelector(state => state.dashboard.totalPaidPaymentsMoney)
    const totalPaidPaymentsGains = useSelector(state => state.dashboard.totalPaidPaymentsGains)
    const totalPaidPaymentsNetGains = useSelector(state => state.dashboard.totalPaidPaymentsNetGains)
   
   
   
   
   
    useEffect(() => {



      


      const init = async () => {


        /**
         * set expired payments
         */

        const today = toLocaleDate(new Date())
        console.log("today:----------------------------->",today)
        
        await window.database.models.Payments.updateFilter({
          where: `status = 'pending' AND payment_date < '${today}'`,
          data: {
            status: 'expired'
          }
        })

        ///////////////////////////////////////////////////

        const fetchTotalLoans = await getTotalLoans()
        console.log("totalLoans:----------------------------->",fetchTotalLoans)
        dispatch(setTotalLoans(fetchTotalLoans))

        const fetchLoansTotalAmounts = await getLoansTotalAmounts()
        console.log("loansTotalAmounts:----------------------------->",fetchLoansTotalAmounts)
        


        dispatch(setTotalLoansMoney(fetchLoansTotalAmounts.loans))

        const fetchTotalPaidPaymentsMoney = await getTotalPaidPaymentsMoney()
        console.log("totalPaidPaymentsMoney:----------------------------->",fetchTotalPaidPaymentsMoney)
        dispatch(setTotalPaidPaymentsMoney(fetchTotalPaidPaymentsMoney))
       
        dispatch(setTotalLoansGains(fetchLoansTotalAmounts.gains))
        dispatch(setTotalPaidPaymentsGains(fetchTotalPaidPaymentsMoney.gains))
        dispatch(setTotalPaidPaymentsNetGains(fetchTotalPaidPaymentsMoney.net_gains))
        /*  const fetchTotalClients = await getTotalClients()
        console.log("totalClients:----------------------------->",fetchTotalClients)
        dispatch(setTotalClients(fetchTotalClients))
         */
        
      }
      init()
    },[])

    return (
      <>
     
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total de Prestamos" total={totalLoans} rate="0.0" levelUp>
            <WalletIcon></WalletIcon>
          </CardDataStats>
          <CardDataStats title="Ganancia Total" total={"$"+formatAmount(totalPaidPaymentsGains) }  levelUp>
            <MoneyBag  className="fill-primary dark:fill-white"
              width="22"
              height="22"></MoneyBag>
          </CardDataStats>
          <CardDataStats title="Total Dinero cirulando" total={"$"+formatAmount(totalLoansMoney - totalPaidPaymentsMoney.total_amount) }  levelUp>
           <DollarSign width={"22"} height={"22"}/>
          </CardDataStats>
  
          <CardDataStats title="Total pagado de cuotas" total={"$"+formatAmount(totalPaidPaymentsNetGains) }  levelUp>
           <DollarSign width={"22"} height={"22"}/>
          </CardDataStats>
          
        </div>
        {/* end   */}
  
      
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <ChartThree /> 
        <ChartTwo></ChartTwo>
        <ChartOne></ChartOne>
        <div className='col-span-12'>
          <h3>Ganancias por mes</h3>
        </div>
       {/*  
          
          
  
           */}
       
        </div>
       
      </>
    );
  };
   

export default Dashboard;   
