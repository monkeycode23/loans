import React, { useEffect, useState, createContext, useContext } from "react";
import CardDataStats from "../../components/CardDataStats.jsx";

import { MoneyBag } from "../../components/Icons.jsx";

import { formatAmount, getWeekDays,getWeekStartEnd } from "../../common/funcs.jsx";

import { useSelector, useDispatch } from "react-redux";

import { setPayments,setPaymentsCount } from "../../redux/reducers/payments.jsx";


import {
  setPage,
  setLimit,
  setTotalPages,
  setSearch,
  setCount,
  setFilter,
  setTotalResults,
} from "../../redux/reducers/_pagination"

import { getTodayPaymentsDate, getPaymentsGainsDate, getClientPaymentsCountDate,toLocaleDate } from "./funcs.jsx";
import PaymentList from "./PaymentsList.jsx";
import CalendarApp from "../../components/Calendar.jsx";

import { setNetGains, setBruteGains } from "../../redux/reducers/gains.jsx";

import  ApexChart from "./chart"

import { calculatePercentages } from "../../common/funcs.jsx";
const Payments = () => {
  const dispatch = useDispatch();

  const pagination = useSelector((state) => state.pagination);

  const totalResults = useSelector((state) => state.pagination.totalResults);

  const paymentsCount = useSelector((state) => state.payments.paymentsCount);

  const payments = useSelector((state) => state.payments.payments);

 

  //console.log(pagination);
  const { page, limit, totalPages, search, filter } = pagination;

 

  const gains = useSelector((state) => state.gains);

  
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    
    
    const init = async () => {


     

      const data = await getTodayPaymentsDate(filter.date,{
        search,
        page,
        limit,
      });

      console.log("data:----------------------------->",data);

      dispatch(setPayments(data.payments));

      dispatch(setTotalResults(data.total));

      //const {start,end} = getWeekStartEnd(date)

      const _paymentsCount = await getClientPaymentsCountDate(toLocaleDate(new Date()));

      //console.log("paymentsCount",paymentsCount);

      dispatch(setPaymentsCount(_paymentsCount));

    
     

      //console.log("data.total",data.total,limit);
      //console.log("data.total pages",data.total > limit ? Math.ceil(data.total / limit) : 1);
      dispatch(
        setTotalPages(data.total > limit ? Math.ceil(data.total / limit) : 1)
      );

      //console.log("limit",limit);
      //console.log("page",page);
      const gains = await getPaymentsGainsDate({
        date:new Date(),
      });

      console.log("gains  -------->>>>",gains);

      
      dispatch(setNetGains(gains.netGains));
      dispatch(setBruteGains(gains.gains));
      /*  setTodayGains(gains.gains)
        setTodayAmount(gains.netGains) */
      /*   const totalResults = data[0].totalResults
        setTotalPages(limit< totalResults ? 
          Math.ceilt(totalResults/limit)
        : 1
        )
 */
      /*   const amount =await  paymentsModel.getAmountSumFromTodaysPaymentsPayed()

        setTodayAmount(amount)
      const gainsPayed =await  paymentsModel.getGainsFromTodaysPaymentsPayed()
 */
      // setTOdayGains(gainsPayed)
    };

    // const r = getGainsFromTodaysPaymentsPayed()

    //  const gainsAll = getGainsFromTodaysPaymentsAll()
    // console.log(gainsPayed)
    //setTOdayGains(0.00)

    // console.log(todayAmount)
    init();

    return () => {};
  }, [page,search,limit]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Total de pagos de hoy"
          total={totalResults}
          rate="0.43%"
          levelUp
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 7h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5M10 12h4M5 12H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l3 3h6l3-3h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1" />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Ganancia hoy"
          total={`$${gains.bruteGains ? formatAmount(gains.bruteGains) : 0}`}
          rate="2.59%"
          levelUp
        >
          <MoneyBag></MoneyBag>
        </CardDataStats>
        <CardDataStats
          title="Total de dinero Recaudado"
          total={`$${gains.netGains ? formatAmount(gains.netGains) : 0}`}
          rate="0.95%"
          levelDown
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1C7.03 1 3 5.03 3 10v9h18V10c0-4.97-4.03-9-9-9zM7 15h10v3H7zm4-8h2V5h-2zm-4 0h2V5H7zM5 18h14v2H5z" />
          </svg>
        </CardDataStats>
      </div>

      <div className={`mt-4 grid grid-cols-1 
        md:grid-cols-3 
        lg:grid-cols-3 
        xl:grid-cols-3 
        md:gap-2 
        xl:gap-2`}>
        <PaymentList date={date} payments={payments}></PaymentList>
        <div className="col-span-1 ">
          <CalendarApp
            onClick={async (date) => {
              console.log("event date---->",date);

              dispatch(setFilter({
                ...filter,
                date:date,
              }));

              const data = await getTodayPaymentsDate(date,{
                
                filter: {
                  search: search,
                  page,
                limit,
                },
              });
              
              //const {start,end} = getWeekStartEnd(date)

             // console.log("start",start);

              const paymentsCount = await getClientPaymentsCountDate(date.toISOString().split('T')[0]);

              //console.log("paymentsCount",paymentsCount);

              dispatch(setPaymentsCount(paymentsCount));
             
              

              dispatch(setPayments(data.payments));

              dispatch(setTotalResults(data.total));

              dispatch(
                setTotalPages(
                  data.total > limit ? Math.ceil(data.total / limit) : 1
                )
              );

              setDate(date);


              const gains = await getPaymentsGainsDate({
                date,
              });
        
              //console.log("gains",gains);
        
              
              dispatch(setNetGains(gains.netGains));
              dispatch(setBruteGains(gains.gains));
              
            }}
          ></CalendarApp>
          <div className="mt-1" >
          <ApexChart  />

          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
