export const getLoan = async (loanId) => {
  try {
    const loan = await window.database.models.Loans.getLoan({
      select: "loans.*, clients.nickname as nickname",
      joins: "LEFT JOIN clients ON clients.id = loans.client_id",
      where: `loans.id = ${loanId}`,
    });

    console.log("loan---a>>", loan);
    return loan[0];
  } catch (error) {}

  // return loan
};


export const deleteLoanDb = async (loanId) => {
    console.log("loanId---a>>", loanId);
    try {
        await window.database.models.Loans.deleteLoan(loanId)
        await window.database.models.Payments.deleteMany({
            where: `loan_id = ${loanId.id}`
        })
       /*  await window.database.models.Notes.deleteMany({
            where: `loan_id = ${loanId}`
        }) */
       
        return true

    } catch (error) {
        console.log("error---a>>", error);
        return false
    }
    
    
    }   


export const getPayments = async (loanId, filtro) => {
  try {
    const payments = await window.database.models.Payments.getPayments({
      where: `loan_id = ${loanId} ${filtro.status ? `AND  status ='${filtro.status}'` : ""}
      ${
        filtro.dates?.length > 0
          ? `AND payment_date BETWEEN '${filtro.dates[0]}' AND '${filtro.dates[1]}'`
          : ""
      } 
            `,
      limit: filtro.limit ,
      offset: filtro.offset,
    });

    const total = await window.database.models.Payments.getPayments({
    select:"COUNT(*) as total",
      where: `loan_id = ${loanId} ${filtro.status ? `AND status = '${filtro.status}'` : ""}
            ${
              filtro.dates?.length > 0
                ? `AND payment_date BETWEEN '${filtro.dates[0]}' AND '${filtro.dates[1]}'`
                : ""
            } `

            
        })    

    console.log("payments---a>>", payments);

    return {payments,total:total[0].total};

  } catch (error) {
    console.log("error---a>>", error);

    return {payments:[],total:0};
  }
}


export const getTotalPayments = async (loanId,filtro) => {
  try {
    const total = await window.database.models.Payments.getPayments({
      select:"COUNT(*) as total",
      where: `loan_id = ${loanId} 
            ${filtro.status ? `AND state = ${filtro.status}` : ""}
            ${
              filtro.dates
                ? `AND payment_date BETWEEN '${filtro.dates.start}' AND '${filtro.dates.end}'`
                : ""
            } `
    });
    return total[0].total;
  } catch (error) {
    console.log("error---a>>", error);
    return 0;
  }
}

export const getPaymentsGains = async (loanId) => {
  try {
    const payments = await window.database.models.Payments.getPayments({
      where: `loan_id = ${loanId} AND status = 'paid'`,

      select: "sum(amount) as net_gains,sum(gain) as brute_gains",
    });
    console.log("payments---a>>", payments);

    /* const gains = payments.reduce((acc, payment) => {
            acc.net_gains += payment.net_gains
            acc.brute_gains += payment.brute_gains
            return acc
        }, { net_gains: 0, brute_gains: 0 }) */
    return payments[0];
  } catch (error) {}
};

export const isLoanCompletedPaid = async (id) => {
  try {
    const payments = await window.database.models.Payments.getPayments({
      where: `loan_id = ${id} AND status IN ('pending','incomplete,expired')`,
    });

    return payments.length == 0;
  } catch (error) {
    console.error("Something bad happend database error");
    return false;
  }
};

export const payPayment = async (paymentId, loan) => {
  try {

    const now = new  Date()

    const year =now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Añade un 0 al mes si es menor que 10
    const day = now.getDate().toString().padStart(2, '0');  // Añade un 0 al día si es menor que 10
    
    console.log("paymentId---a>>", paymentId);

    await window.database.models.Payments.updatePayment({
      id: paymentId,
      status: "paid",
      paid_date: `${year}-${month}-${day}`,
    });

    const isCompleted = await isLoanCompletedPaid(loan.id);

    if (isCompleted) {
      await window.database.models.Loans.updateLoan({
        id: loan.id,
        status: "completed",
      });
    }

    return isCompleted;
  } catch (error) {
    console.log("error---a>>", error);
    return false;
  }
};

export const getNotes = async (id, type) => {
  try {
    const notes = await window.database.models.Notes.getNote({
      where: `${type}_id = ${id} `,
    });
    console.log("notes---a>>", notes);
    return notes;
  } catch (error) {
    console.log("error---a>>", error);
    return [];
  }
};
