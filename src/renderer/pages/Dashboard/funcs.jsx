

export const getTotalLoans = async () => {
    try {
        const loans = await window.database.models.Loans.getTotalLoans()

        return loans[0].total
    } catch (error) {
        console.log(error)
        return 0
    }
}


export const getTotalPaidPaymentsMoney = async () => {
    try {
        const payments = await window.database.models.Payments.getPayments({
            select: `SUM(payments.net_amount) as total_amount,
            SUM(payments.gain) as gains,
            SUM(payments.net_amount) as net_gains
            `,
            joins: 'JOIN loans l ON payments.loan_id = l.id ',
            where: `payments.status = 'paid' AND l.status IN ('active','completed')`
        })

        console.log("asdasdasdasdasdasdpayments:----------------------------->",payments)
        return {total_amount:payments[0].total_amount,gains:payments[0].gains,net_gains:payments[0].net_gains}
    } catch (error) {
        console.log(error)
        return 0
    }
}

export const getLoansTotalAmounts = async () => {
    try {
        const loans = await window.database.models.Loans.getLoans({
            select: 'SUM(amount) as total_amount,SUM(gain) as gains',
            where: `status IN ('active','completed')`
        })

 

        return {loans:loans[0].total_amount,gains:loans[0].gains}
      

    } catch (error) {
        console.log(error)
        return 0
    }
}




