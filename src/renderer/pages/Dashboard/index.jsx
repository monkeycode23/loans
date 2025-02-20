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
const Dashboard = () => {

    const loans = useSelector(state => state.loans.loans)
    const totalLoans = useSelector(state => state.loans.totalLoans)
    const payments = useSelector(state => state.payments.payments)
    const monthly = useSelector(state => state.loans.monthly)
    const loansTotalAmount = useSelector(state => state.loans.loansTotalAmount)
    const paymentsTotalAmount = useSelector(state => state.payments.paymentsTotalAmount)
    const clients = useSelector(state => state.clients.clients)
    const totalClients = useSelector(state => state.clients.totalClients)

  
    return (
      <>
     
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total de Prestamos" total={totalLoans} rate="0.0" levelUp>
            <WalletIcon></WalletIcon>
          </CardDataStats>
          <CardDataStats title="Ganancia Total" total={"$"+formatAmount(monthly) || 0}  levelUp>
            <MoneyBag  className="fill-primary dark:fill-white"
              width="22"
              height="22"></MoneyBag>
          </CardDataStats>
          <CardDataStats title="Total Dinero cirulando" total={"$"+formatAmount(loansTotalAmount || 0) }  levelUp>
           <DollarSign width={"22"} height={"22"}/>
          </CardDataStats>
  
          <CardDataStats title="Total pagado de cuotas" total={"$"+formatAmount(paymentsTotalAmount || 0) }  levelUp>
           <DollarSign width={"22"} height={"22"}/>
          </CardDataStats>
          
        </div>
        {/* end   */}
  
      
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <ChartThree /> 
        <ChartTwo></ChartTwo>
        <ChartOne></ChartOne>
       {/*  
          
          
  
           */}
       
        </div>
       
      </>
    );
  };
   

export default Dashboard;   
