


export const getTotalClientsDebtors = async () => {

  const debtors = await window.database.models.Clients.getClients({
    select:`DISTINCT COUNT(DISTINCT clients.id) as total_debtors`,
    joins:'JOIN loans l ON clients.id = l.client_id LEFT JOIN payments p ON l.id = p.loan_id',
    where: `p.status = 'expired' `
  })

  console.log("debtors:----------------------------->",debtors)

  return debtors[0].total_debtors
}


export const getTotalClientsIncompletePayments = async () => {

  const debtors = await window.database.models.Clients.getClients({
    select:`DISTINCT COUNT(DISTINCT clients.id) as total_incomplete_payments`,
    joins:'JOIN loans l ON clients.id = l.client_id LEFT JOIN payments p ON l.id = p.loan_id',
    where: `p.status = 'incomplete' `
  })

  console.log("debtors:----------------------------->",debtors)

  return debtors[0].total_incomplete_payments
}

export const getClients = async (filter, limit = 5, page = 1) => {

        let clients;
        let total = 0;
        let select = `DISTINCT l.client_id, 
          clients.*, 
          COUNT(DISTINCT l.id) AS total_loans,
          
          -- Subconsulta para contar pagos de diferentes estados
          (SELECT COUNT(DISTINCT p.id)
           FROM payments p
           WHERE p.loan_id = l.id) AS total_payments,
      
          -- Subconsulta para contar pagos pagados
          (SELECT COUNT(DISTINCT p.id)
           FROM payments p
           WHERE p.loan_id = l.id AND p.status = 'paid') AS total_paid_payments,
      
          -- Subconsulta para contar pagos pendientes
          (SELECT COUNT(DISTINCT p.id)
           FROM payments p
           WHERE p.loan_id = l.id AND p.status = 'pending') AS total_pending_payments,
      
          -- Subconsulta para contar pagos vencidos
          (SELECT COUNT(DISTINCT p.id)
           FROM payments p
           WHERE p.loan_id = l.id AND p.status = 'expired') AS total_expired_payments,
      
          -- Subconsulta para contar pagos incompletos
          (SELECT COUNT(DISTINCT p.id)
           FROM payments p
           WHERE p.loan_id = l.id AND p.status = 'incomplete') AS total_incomplete_payments`
   

      const query = {
        select: select,
        joins: `
          LEFT JOIN loans l ON clients.id = l.client_id
          LEFT JOIN payments p ON l.id = p.loan_id
        `,
        orderBy: `clients.id DESC`,
        where: `${filter.nickname ? `clients.nickname LIKE '%${filter.nickname}%'` : ""}`,
        limit: limit,
        offset: ((page - 1) * limit),
        groupBy: `clients.id`
      };
      

        clients = await window.database.models.Clients.getClients(query)

        const query2 = {
          select:`count(*) as total`,
          
          where:`${filter.nickname ? `clients.nickname LIKE '%${filter.nickname}%'` : ""}`,

          
        }
        
        const totalclients = await window.database.models.Clients.getClients(query2)
        console.log("totalclients:----------------------------->",totalclients)
        
        return {clients,total:totalclients[0].total}
    

}




/*  const query = {
        select: `
          DISTINCT l.client_id, clients.*,
          COUNT(DISTINCT l.id) AS total_loans,
          COUNT(DISTINCT p.id) AS total_payments,
          COUNT(DISTINCT CASE WHEN p.status = 'paid' THEN p.id END) AS total_paid_payments,
          COUNT(DISTINCT CASE WHEN p.status = 'pending' THEN p.id END) AS total_pending_payments,
          COUNT(DISTINCT CASE WHEN p.status = 'expired' THEN p.id END) AS total_expired_payments,
          COUNT(DISTINCT CASE WHEN p.status = 'incomplete' THEN p.id END) AS total_incomplete_payments
        `,
        joins: `
          LEFT JOIN loans l ON clients.id = l.client_id
          LEFT JOIN payments p ON l.id = p.loan_id
        `,
        orderBy: `clients.id DESC`,
        where: `
          ${filter.nickname ? `clients.nickname LIKE '%${filter.nickname}%'` : "1=1"} 
          AND p.status = 'expired'
        `,
        limit: limit,
        offset: ((page - 1) * limit),
        groupBy: `clients.id`
      }; */