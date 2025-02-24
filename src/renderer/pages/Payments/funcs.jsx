




export const getTodayPaymentsDate = async ({
    
    page,
    limit,
    search
}) => {
    try {

        const now = new Date()
        console.log("now:----------------------------->",now)
        const date =search ? new Date(search) : now

        const dateLocal = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));  // Ajusta la fecha a la zona horaria local
        const dateString = dateLocal.toISOString().split('T')[0]; // Ahora la fecha será correcta en tu zona horaria
        //console.log(dateString);
        console.log("dateString:----------------------------->",dateString)
        const data = await window.database.models.Payments.getPayments({
            select: "payments.*, loans.client_id, clients.nickname",    
            where: `payment_date = '${dateString}'`,
            joins : `JOIN loans ON loans.id = payments.loan_id 
            JOIN clients ON clients.id = loans.client_id`,
            limit,
            offset: (page - 1) * limit
        })

        const total = await window.database.models.Payments.getPayments({
            select: "COUNT(id) as total",
            where: `payment_date = '${dateString}'`,
        })

        return {payments:data,total:total[0].total}

    } catch (error) {
        console.log("error:----------------------------->",error)

        return {payments:[],total:0}
    }
}

export const toLocaleDate = (date) => {
    const dateLocal = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));  // Ajusta la fecha a la zona horaria local
    const dateString = dateLocal.toISOString().split('T')[0]; // Ahora la fecha será correcta en tu zona horaria
    return dateString
}


export const getPaymentsGainsDate = async ({
    date
}) => {

    try {

        const dateString =date ?  toLocaleDate(date) : toLocaleDate(new Date())
        console.log("dateString:----------------------------->",dateString)
        const gains = await window.database.models.Payments.getPayments({
            select: "SUM(amount) as netGains, SUM(gain) as gains",
            where: `payment_date = '${dateString}' AND status='paid'`,
        })

        console.log(gains)

        return {
            netGains:gains[0].netGains ? gains[0].netGains : 0,
            gains:gains[0].gains ? gains[0].gains : 0}
        
    } catch (error) {
        console.log("error:----------------------------->",error)
    }

}
