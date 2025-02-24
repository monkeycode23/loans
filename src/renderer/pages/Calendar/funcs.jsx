



export const  getWeekPayments = async (dates)=>{

    try {
        const fetch = await window.database.models.Payments.getPayments({

            where:`payment_date >= '2025-02-17' 
AND payment_date <= '2025-02-23';`
        })

        console.log("fetch:----------------------------->",fetch)
        return fetch
    } catch (error) {
        console.log(error)
        return []
    }
}