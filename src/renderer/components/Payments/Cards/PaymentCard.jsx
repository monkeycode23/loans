import React from 'react'

const PaymentCard = props => {

    const { payment } = props;

    const { id, amount, date, status, notes } = payment;



    
    return (
        <>
        <div className='payment-card'>
            <div className='payment-card-header'>
                <h3>{amount}</h3>
                <p>{date}</p>
            </div>
            <div className='payment-card-body'>
                <p>{notes}</p>
            </div>
        </div>
        </>
    )
}


export default PaymentCard