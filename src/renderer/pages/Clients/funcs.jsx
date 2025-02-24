


export const getClients = async (filter, limit = 5, page = 1) => {

        let clients;
        let total = 0;
    
        if (filter.state ) {
    

          console.log("filter.state:----------------------------->",filter.state)
          clients = await window.database.models.Clients.getClients({
            select:`DISTINCT l.client_id, clients.*`,
            joins:'JOIN loans l ON clients.id = l.client_id LEFT JOIN payments p ON l.id = p.loan_id',
            where:`p.status =' ${filter.state}' ${filter.nickname ? ` AND clients.nickname LIKE '%${filter.nickname}%'` : ""}`,         
            orderBy:`clients.id DESC`,
            limit:limit,
            offset:((page - 1) * limit),})
          
          
          const totalClients = await window.database.models.Clients.getClients({
            select:`DISTINCT l.client_id, clients.* `,
            joins:'JOIN loans l ON clients.id = l.client_id LEFT JOIN payments p ON l.id = p.loan_id',
            where:`p.status =' ${filter.state}' ${filter.nickname ? ` AND clients.nickname LIKE '%${filter.nickname}%'` : ""}`,         
            })

          console.log("totalClients:----------------------------->",totalClients)
          total = totalClients.length
    
        /*     console.log("clients")
    
          total = await window.sqlite.query(`SELECT DISTINCT l.client_id, count(c.id) as total
          FROM clients c
          JOIN loans l ON c.id = l.client_id
          LEFT JOIN payments p ON l.id = p.loan_id
          WHERE  p.state = '${filter.state}' 
          ${filter.nickname ? ` AND c.nickname LIKE '%${filter.nickname}%'` : ""}
          ORDER BY c.id DESC
          
          `);
    
            console.log(total[0].total)
           total = total[0].total
        }
    
        else {
          clients = await window.sqlite.query(`SELECT * 
          FROM clients
          WHERE clients.nickname LIKE '%${filter.nickname}%' 
          ORDER BY clients.id DESC
          LIMIT ${limit} OFFSET ${(page - 1) * limit}
        `);
    
          total = await this.getTotalClients()
        }
    
    
    
      for (const client of clients) {
          try {
            // Obtenemos los pagos para este cliente
            const payments = await window.sqlite.query(`SELECT
              l.client_id,
              COUNT(CASE 
                      WHEN p.payment_date IS NOT NULL AND p.state = 'payed' THEN 1 
                    END) AS cuotas_pagadas,
              COUNT(CASE 
                      WHEN p.payed_date IS NULL AND p.state = 'expired' THEN 1 
                    END) AS cuotas_vencidas,
              COUNT(CASE 
                      WHEN p.state = 'incomplete'  THEN 1 
                    END) AS cuotas_incompletas
            FROM loans l
            LEFT JOIN payments p ON l.id = p.loan_id
            WHERE l.client_id = '${client.id}'  -- Asegúrate de que client.id es correcto
            GROUP BY l.client_id;
          `);
    
            // Agregamos los pagos al objeto del cliente, verificando si hay datos
            client.expired = payments.length > 0 ? payments[0].cuotas_vencidas : 0;
            client.incomplete = payments.length > 0 ? payments[0].cuotas_incompletas : 0;
            client.payed = payments.length > 0 ? payments[0].cuotas_pagadas : 0;
    
          } catch (error) {
            console.error(`Error al obtener los pagos para el cliente ${client.id}:`, error);
          }
        } */
    
      
       

    }else{

        const query = {
          select:`*`,
          orderBy:`id DESC`,
          where:`${filter.nickname ? `clients.nickname LIKE '%${filter.nickname}%'` : ""}`,
          limit:limit,
          offset:((page - 1) * limit),
        }

        clients = await window.database.models.Clients.getClients(query)

        const query2 = {
          select:`count(*) as total`,
          
          where:`${filter.nickname ? `clients.nickname LIKE '%${filter.nickname}%'` : ""}`,

          
        }
        
        const totalclients = await window.database.models.Clients.getClients(query2)
        console.log("totalclients:----------------------------->",totalclients)
        
        return {clients,total:totalclients[0].total}
    }


return { clients, total }
    


}

