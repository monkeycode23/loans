import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Importa FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa el plugin para la vista de cuadrícula diaria
import interactionPlugin from '@fullcalendar/interaction'; // Permite la interacción con el calendario (como el clic en un día)
import esLocale from '@fullcalendar/core/locales/es'; // importar el locale en español (ya incluido en FullCalendar)
import timeGridPlugin from '@fullcalendar/timegrid'; // Para la vista de la semana con los días

import {useNotification}  from "../../components/Notifications"
import "./calendar.css"

import {useSelector,useDispatch} from 'react-redux'

import { getWeekPayments } from './funcs';

const Calendar = () => {

  const {showNotification,setNotification} = useNotification()

  const payments = useSelector((state)=>state.payments.payments)
  const dispatch = useDispatch()
    const [events, setEvents] = useState([
        { title: 'Evento 1', date: '2025-01-26', },
        { title: 'Evento 1', date: '2025-01-26' },
        { title: 'Evento 2', date: '2025-01-27' },
      ]);


      function setDataStateEvents(r){
       
         for (const row of r) {
          const payments=[];
          payments.push( { title: row.client_name,
             date: row.payment_day,
              monto:row.monto,
              label:row.label,
              name:row.client_name,
              color: row.state == "expired" ? "#FF6666" : "#6577F3",
             id:row.payment_id,
             },
            )
         }

         return payments
      }


    useEffect(()=>{

      const init = async ()=>{

       
         const r = await getWeekPayments()
         console.log(r)

         setNotification({
          type:"success",
          message:"Pagado con exito"
         })

         showNotification() 

         
         setEvents(setDataStateEvents(r))
         
      }


      init()

      return ()=>{}
    },[])

   
    const handleDatesSet = async (info) => {
      // info.start y info.end son las fechas de inicio y fin del rango de la vista actual
      const startDate = info.start; // Fecha de inicio
    const endDate = info.end; // Fecha de fin
      
    // Convertir las fechas a formato 'YYYY-MM-DD'
    const startFormatted = startDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const endFormatted = endDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      /* const r = await paymentsModel.getWeeksPaymentsState("pending",[
        startFormatted,endFormatted ])

       

       setEvents(setDataStateEvents(r))
       */
    };

      const handleDateClick = (arg) => {
       // alert('Fecha seleccionada: ' + arg.dateStr);
      };
    
      const handleEventClick = async(clickInfo) => {

        const data = clickInfo.event.extendedProps;
       
        if(confirm(`Deseas pagar la ${data.label} de ${data.name} monto ${data.monto}`)){



          await paymentsModel.payPayment(clickInfo.event.id)

            setEvents((prev)=>prev.filter((p)=>{

            if(p.id!=clickInfo.event.id) return p
            })
           )
        }  

      }
    



  return (
    <>
    


    <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]} // Usamos timeGridPlugin para la vista semanal
        initialView="timeGridWeek" // Configura la vista por defecto a la semana
        events={events} // Los eventos que se muestran en el calendario
        dateClick={handleDateClick} // Acción al hacer clic en una fecha
        eventClick={handleEventClick} // Acción al hacer clic en un evento
        locale={esLocale} // Configura el idioma en español
        datesSet={handleDatesSet}
      />
 
    </>
  );
};





export default Calendar;