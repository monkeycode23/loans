import React, { useState, useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ReactApexChart from 'react-apexcharts';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoansList } from './LoansList';
import { AddLoanModal } from './AddLoanModal';
import { useNotification } from '../../components/Notifications';

import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import EditModalClient from './EditClientModal';
import Pagination from '../../components/Pagination'
import Select from '../../components/Forms/SelectGroup/Select';
import EditIcon, { UserIcon, StarIcon, PaymentIcon, WalletIcon } from '../../components/Icons';
import { ClientCard } from './ClientCard';

import { useDispatch, useSelector } from 'react-redux';

import {setClient,setNetGains,setBruteGains} from '../../redux/reducers/clients'
import {setLoans,setTotalLoans} from '../../redux/reducers/loans'

import { getClient,getClientGains,getClientLoans,getClientPaymentsCount,getClientNotes,getClientInformation } from './funcs';
import { formatAmount } from '../../common/funcs';

import {setInformation,setContactInformation,setFinancialInformation,setBasicInformation} from '../../redux/reducers/information'
import {setPaymentsCount} from '../../redux/reducers/payments'

const Client = () => {

  //hooks
  const dispatch = useDispatch()
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const { id } = useParams();


  //Clients
  const client = useSelector((state) => state.client);

  //Loans
  const loans = useSelector((state) => state.loans);
  const totalLoans = useSelector((state) => state.loans.totalLoans)

  //Gains
  const netGains = useSelector((state) => state.clients.netGains)
  const bruteGains = useSelector((state) => state.clients.bruteGains)


  //Information
  const information = useSelector((state) => state.information);

  const [expiredPayments, setExpiredPayments2] = useState(0)

  //Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('')



  const paymentsCount = useSelector((state) => state.payments.paymentsCount)
  //Payments
  /* const [paymentsCount, setPaymentsCount] = useState({
    pending:0,
    paid:0,
    expired:0
  })

 */
  useEffect(() => {
    const init = async () => {

      //Get Client
    const data =await getClient(id)
    console.log("data:----------------------------->",data)

     dispatch(setClient(data))

    const fetchLoans =await  getClientLoans(id,{
      limit,
      page,
      status: filter,
     
    })

    //Get Information
    const _information = await getClientInformation(id)
    console.log("information:----------------------------->",_information)
    //dispatch(setInformation(information))
   if(_information!==undefined){
    dispatch(setContactInformation({
      email:_information.email ? _information.email:'',
      phonenumber:_information.phone ? _information.phone:'',
    }))

    dispatch(setFinancialInformation({
      cbu:_information.cbu ? _information.cbu : '',
      alias : _information.alias ? _information.alias : ''
    })) 

    dispatch(setBasicInformation({
      name:_information.name ? _information.name : '',
      lastname:_information.lastname ? _information.lastname : ''
    }))
    
  }


    //Get Notes
    const notes = await getClientNotes(id)
    console.log("notes:----------------------------->",notes)
//dispatch(setNotes(notes))


    //Get Payments Count
    const paymentsCount = await getClientPaymentsCount(id)
    console.log("COUNTpayments:----------------------------->",paymentsCount)
    dispatch(setPaymentsCount(paymentsCount))

    console.log("fetchLoans:----------------------------->",fetchLoans)
    dispatch(setLoans(fetchLoans.loans))
    dispatch(setTotalLoans(fetchLoans.total))

    console.log("loans:----------------------------->",totalLoans)

    //Get Gains
    const gains = await getClientGains(id)
    console.log("gains:----------------------------->",gains)
    dispatch(setNetGains(gains.net_amount))
    dispatch(setBruteGains(gains.brute_gain))

    }
    init()

    return () => {

    }
  }, [page, filter,client,totalLoans])



  function changePage(page) {
    setPage(page)
  }

  return (
    <>
      
        <Breadcrumb pageName="Cliente" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Prestamos del Cliente" total={totalLoans} rate="0.0" levelUp>
            <WalletIcon></WalletIcon>
          </CardDataStats>
         
          <CardDataStats title="Ganancias brutas del cliente" total={"$ " + formatAmount(bruteGains)} rate="0.0" levelUp>
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
          <CardDataStats title="Dinero recaudado del cliente" total={"$ " + formatAmount(netGains)} rate="0.0" levelUp>
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
          <div>
            <ApexChart paymentsCount={paymentsCount} />
          </div>
         
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

          <div className="col-span-12 xl:col-span-12">

            <AddLoanModal clientId={id} setLoans={setLoans} ></AddLoanModal>
          </div>
          <div className="flex justify-between col-span-12 xl:col-span-12 bg-white p-1">
            <Select className=""
              onChange={async (e) => setFilter(e.target.value)}
              options={[{
                label: "filtro Prestamos",
                value: "",
                selected: true
              },


              {

                label: "activos",
                value: "active",
                selected: false
              },

              {

                label: "completados",
                value: "completed",
                selected: false
              },

              {

                label: "cancelados",
                value: "canceled",
                selected: false
              },




              ]}>

            </Select>
            <Pagination currentPage={page} totalPages={totalPages} changePage={changePage}></Pagination>

          </div>
          <div className="col-span-6 xl:col-span-4">

            { <ClientCard /> }
            
            
          </div>
          <div className="col-span-6 xl:col-span-8">

             <LoansList  /> 
          </div>
          {/* <ChatCard /> */}
        </div>
    

    </>
  );
};


import './chart.css'

const ApexChart = () => {

  const paymentsCount = useSelector((state) => state.payments.paymentsCount)
  const {pending,expired,paid,incomplete} = paymentsCount
  console.log("pending:----------------------------->",pending)
  console.log("expired:----------------------------->",expired)
  console.log("paid:----------------------------->",paid)
  console.log("incomplete:----------------------------->",incomplete)

  const [state, setState] = React.useState({
    series: [0,0,0,0],  // Datos: Pendientes, Vencidos, Pagados
    labels: [],  // Etiquetas personalizadas

    options: {
      chart: {
        type: 'donut',  // Tipo de gráfico: dona (donut)
        height: '100%',  // El gráfico tomará el 100% de la altura del contenedor
        width: '100%',   // El gráfico tomará el 100% del ancho del contenedor
      },
      dataLabels: {
        enabled: false,  // Deshabilitar etiquetas de datos dentro de la dona
      },
      legend: {
        position: 'bottom',  // La leyenda estará en la parte inferior
        offsetY: 0,
        height: "auto",
        markers: {
          show: false,  // Ocultar los puntos de colores (círculos) de la leyenda
        },
        useSeriesColors: false,  // Deshabilitar el uso de colores de la serie en la leyenda

      },
      plotOptions: {
        pie: {
          donut: {
            size: '80%',  // Reducimos el tamaño del donut (agujero en el centro)
            stroke: {
              width: 5,  // Grosor del borde
              colors: ['#ffffff'], // Color del borde
            }
          }
        }
      },
      // Primer, segundo y tercer color (Pendientes, Vencidos, Pagados)
      responsive: [
        {
          breakpoint: 480,  // Ajuste para pantallas más pequeñas
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
              markers: {
                show: false,  // Ocultar los puntos de colores (círculos) de la leyenda
              },
              useSeriesColors: false,  // Deshabilitar el uso de colores de la serie en la leyenda
            }
          }
        }
      ]
    },
  });

  useEffect(() => {

    const {pending,expired,paid,incomplete} = paymentsCount
    if(pending>0 || expired>0 || paid>0 || incomplete>0){
    setState({
      ...state,
      options:{
        ...state.options,
        labels: ['Pendientes '+pending,  'Pagados '+paid,'Vencidos '+expired,'Incompletos '+incomplete  ],  // Aquí aseguramos que los labels se configuren correctamente
      colors: ['rgba(0,143,251,1)', '#4CAF50','#FF5733', '#FFC107'],
      },
      series: [pending,paid, expired, incomplete],
    })
  }else{
    setState({
      ...state,
      options:{
        ...state.options,
        labels: ['No hay pagos'],
        colors: ['#000000'],
      },
      series: [1],
    })

  }
  }, [pending, expired, paid])
  return (
    <div className="chart-card" style={{ width: '100%', height: '200px' }}>  {/* Contenedor pequeño */}
      <ReactApexChart 
        options={state.options} 
        series={state.series} 
        type="donut" 
        width="100%"  // El gráfico ocupa todo el ancho del contenedor
        height="100%" // El gráfico ocupa toda la altura del contenedor
      />
    </div>
  );
}


export default Client;