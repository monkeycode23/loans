//import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getYearPaymentsTotalAmountDate } from '../../pages/Payments/funcs';


const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#A5D6A7','#FFEB3B'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
 
  stroke: {
    width: [3, 3,3],
    curve: 'smooth',
     // Cambié a 'smooth' para que la curva del gráfico sea más fluida
  },
  fill: {
    opacity: 1, // Esto elimina el área de fondo
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
     
     
    },
  },
  dataLabels: {
    enabled: true, // Habilitamos los data labels
    style: {
      fontSize: '15px', // Tamaño de la fuente
      colors:  ['#3C50E0', '#A5D6A7','#FFB74D'] // Color del texto de las etiquetas
    },
    formatter: function (val) {
      // Formatear número con punto cada 3 dígitos
      const formattedValue = val.toLocaleString('es-ES'); // 'es-ES' para formato con punto en miles
      return '$'+(formattedValue >= 1000000 ? (formattedValue / 1000000).toFixed(1) + 'M' : formattedValue);
    },
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE','#3056D3'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      
      'Ene',
      'Feb',
      'Mar',
      'Arb',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        // Verifica el valor y convierte a formato más legible si es mayor a un millón
        if (value >= 1000000) {
          return (value / 1000000).toFixed(1) + 'M'; // Muestra en millones
        }
        const formattedValue = value.toLocaleString('es-ES'); // 'es-ES' para formato con punto en miles
        return '$'+(formattedValue >= 1000000 ? (formattedValue / 1000000).toFixed(1) + 'M' : formattedValue);
      // De lo contrario, muestra el valor original
      },
    },
  },
};


const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Ganancia Neta',
        data: [],
      },

      {
        name: 'Ganancia Bruta',
        data: [140000,360000],
      },
      {
        name: 'Ganancia Esperada',
        data: [250000,450000],
      },
    ],
  });

  function setMonthValues(r){

    const netMonths =[0,]
    const bruteMonths=[0,]



    for (const month of r) {
      console.log(month)

      netMonths[month.month-1] = month.total_net
      bruteMonths[month.month-1] = month.total_gains
      /*
       */
    }

    console.log(netMonths)
    console.log(bruteMonths)
    return {
      netMonths,
      bruteMonths
    }
  }

 useEffect(() => {
    
    const init =async()=>{

      const {data,expected} = await getYearPaymentsTotalAmountDate()
      console.log("data:----------------------------->",data)
      console.log("expected:----------------------------->",expected)
      const gains = setMonthValues(data)
      
      const expectedGains = setMonthValues(expected)
      console.log("expectedGains:----------------------------->",expectedGains)
      //console.log("expected:----------------------------->",expected)

    console.log("gains:----------------------------->",gains)
       setState({
        series: [
          {
            name: 'Ganancia Neta',
            data: gains.netMonths,
          },
          {
            name: 'Ganancia Bruta',
            data: gains.bruteMonths,
          },
           {
            name: 'Ganancia Esperada',
            data: expectedGains.bruteMonths,
          }, 
        ],
      }) 

        /*  

      */
    }
    
    init()
    return () => {
      
    }
  }, [])
  
/*   const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };  */
 // handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="flex  items-start justify-between gap-3 ">
        <div className="flex w-full flex-wrap gap-2 sm:gap-5">
          <div className="flex ">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Ganancia Neta</p>
              <p className="text-sm font-medium">{}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-success"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-success">Ganancia Bruta</p>
              <p className="text-sm font-medium">{}</p>
            </div>
          </div>

          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-warning"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-warning">Ganancia Esperada</p>
              <p className="text-sm font-medium">{}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
           
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Anual
            </button>
          </div>
        </div>
      </div>

     
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      
    </div>
  );
};

export default ChartOne;
