export  function formatDateDifference(date) {
    const today = new Date();
    const givenDate = new Date(date);
  
    // Eliminar la hora para hacer solo comparaciones de fechas (sin horas)
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
  
    // Calcular la diferencia en milisegundos
    const timeDiff = givenDate - today;
    
  //  console.log(date+" "+today)
    // Diferencia en días
      // Diferencia en días (utilizando Math.floor para redondear hacia abajo)
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))+1;

  const roundedDaysDiff = Math.round(daysDiff);
   // console.log("diferencia de dias " +daysDiff)

    
     // Si la fecha dada es ayer
  if (daysDiff === -1) {
    return "Ayer";
  }

  // Si la fecha dada está en los próximos días
  if (daysDiff < 0 && daysDiff < 7) {
    return ` hace ${Math.abs(Math.round(daysDiff))} día${Math.floor(daysDiff) < 1 ? "s" : ""}`;
  }
  
 /*  // Si la fecha dada está en la pasada semana (7 días o más)
  if (daysDiff >= 7 && daysDiff > 0) {
    return `Hace ${Math.floor(daysDiff / 7)} semana${Math.floor(daysDiff / 7) < 1 ? "s" : ""}`;
  }

  // Si la fecha dada está en el mes pasado
  if (daysDiff >= 30 && daysDiff < 365) {
    return `Hace ${Math.floor(daysDiff / 30)} mes${Math.floor(daysDiff / 30) < 1 ? "es" : ""}`;
  }

  // Si la fecha dada está hace más de un año
  if (daysDiff >= 365) {
    return `Hace ${Math.floor(daysDiff / 365)} año${Math.floor(daysDiff / 365) < 1 ? "s" : ""}`;
  } /**/
    // Si la fecha dada es hoy
    if (daysDiff === 0) {
      return "Hoy";
    }
    
    // Si la fecha dada es mañana
    if (daysDiff === 1) {
      return "Mañana";
    }
    
    // Si la fecha dada está en los próximos días
    if (daysDiff > 1 && daysDiff < 7) {
      return `en ${Math.floor(daysDiff)} días`;
    }
    
    // Si la fecha dada está en la próxima semana (7 días o más)
    if (daysDiff >= 7 && daysDiff < 30) {
      return `en ${Math.floor(daysDiff / 7)} semana${Math.floor(daysDiff / 7) > 1 ? "s" : ""}`;
    }
    
    // Si la fecha dada está en el próximo mes
    if (daysDiff >= 30 && daysDiff < 365) {
      return `en ${Math.floor(daysDiff / 30)} mes${Math.floor(daysDiff / 30) > 1 ? "es" : ""}`;
    }
    
    // Si la fecha dada es más de un año
    if (daysDiff >= 365) {
      return `en ${Math.floor(daysDiff / 365)} año${Math.floor(daysDiff / 365) > 1 ? "s" : ""}`;
    }
    
    return date
  }



 export  function getMonday(date) {
    const dayOfWeek = date.getDay();  // Obtiene el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;  // Si es domingo (0), restamos 6 días, si no, restamos dayOfWeek - 1
    const monday = new Date(date);  // Crea una nueva fecha para no modificar la original
    monday.setDate(date.getDate() - difference);  // Resta los días para llegar al lunes
    
    
    const year = monday.getFullYear();
    const month = (monday.getMonth() + 1).toString().padStart(2, '0');  // Añade un 0 al mes si es menor que 10
    const day = monday.getDate().toString().padStart(2, '0');  // Añade un 0 al día si es menor que 10
    
    return `${year}-${month}-${day}`;
  }

 export  function getSunday(date) {
    const dayOfWeek = date.getDay();  // Obtiene el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const difference = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;  // Si es domingo (0), no hay diferencia, si no, restamos para llegar al domingo
    const sunday = new Date(date);  // Crea una nueva fecha para no modificar la original
    sunday.setDate(date.getDate() + difference);  // Suma los días necesarios para llegar al domingo
   
    const year = sunday.getFullYear();
    const month = (sunday.getMonth() + 1).toString().padStart(2, '0');  // Añade un 0 al mes si es menor que 10
    const day = sunday.getDate().toString().padStart(2, '0');  // Añade un 0 al día si es menor que 10
    
    return `${year}-${month}-${day}`;
    
  }
  export  function formatAmount(amount){

    return new Intl.NumberFormat('de-DE').format(amount)
  }


 export  function getMonthStartEnd() {
    const today = new Date();  // Fecha actual
  
    // Fecha de inicio del mes (primer día del mes)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Fecha de fin del mes (último día del mes)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    // Formatear las fechas como 'YYYY-MM-DD'
    const formatDate = (date) => date.toISOString().split('T')[0];
  
    return {
      start: formatDate(startOfMonth),
      end: formatDate(endOfMonth)
    };
  }



  
    // Formatear las fechas como 'YYYY-MM-DD'
    const formatDate = (date) => date.toISOString().split('T')[0];
  
  /* function formatDateDifference(date) {
  const today = new Date();
  const givenDate = new Date(date);

  // Eliminar la hora para hacer solo comparaciones de fechas (sin horas)
  today.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  // Calcular la diferencia en milisegundos
  const timeDiff = today - givenDate;
  
  // Diferencia en días
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  // Si la fecha dada es hoy
  if (daysDiff === 0) {
    return "Hoy";
  }

  // Si la fecha dada es mañana
  if (daysDiff === -1) {
    return "Mañana";
  }

  // Si la fecha dada es ayer
  if (daysDiff === -1) {
    return "Ayer";
  }

  // Si la fecha dada está en los próximos días
  if (daysDiff > 0 && daysDiff < 7) {
    return `Hace ${Math.floor(daysDiff)} día${Math.floor(daysDiff) > 1 ? "s" : ""}`;
  }
  
  // Si la fecha dada está en la pasada semana (7 días o más)
  if (daysDiff <= 7 && daysDiff > 0) {
    return `Hace ${Math.floor(daysDiff / 7)} semana${Math.floor(daysDiff / 7) > 1 ? "s" : ""}`;
  }

  // Si la fecha dada está en el mes pasado
  if (daysDiff >= 30 && daysDiff < 365) {
    return `Hace ${Math.floor(daysDiff / 30)} mes${Math.floor(daysDiff / 30) > 1 ? "es" : ""}`;
  }

  // Si la fecha dada está hace más de un año
  if (daysDiff >= 365) {
    return `Hace ${Math.floor(daysDiff / 365)} año${Math.floor(daysDiff / 365) > 1 ? "s" : ""}`;
  }

  return "Fecha fuera de rango";
} */


  export function getLastWeek() {
    const today = new Date();
    
    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const dayOfWeek = today.getDay();
    
    // Ajustamos si hoy es domingo (para que el cálculo sea correcto)
    // Si hoy es domingo, 'dayOfWeek' será 0, por lo que restamos 6 días para llegar al lunes de la semana pasada
    const diffToLastMonday = (dayOfWeek + 6) % 7 + 7;
    
    // Calcular la fecha del lunes de la semana pasada
    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(today.getDate() - diffToLastMonday); // Restamos el número adecuado de días
    
    // Calcular la fecha del domingo de la semana pasada (6 días después del lunes)
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); // Domingo es 6 días después del lunes
    
    console.log(endOfLastWeek)
    return {
        start: startOfLastWeek,
        end: endOfLastWeek

    };
}
