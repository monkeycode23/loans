import React from "react";

import { formatAmount } from "../../common/funcs";

import DropdownDefault from "../../components/Dropdowns/DropdownDefault";

import IncompleteModal from "./IncompleteModal";
import { MoneyBillAlt, PaymentIcon2 } from "../../components/Icons";
import { payPayment } from "../Loan/funcs";

import { useDispatch ,useSelector} from "react-redux";
import { updatePayment } from "../../redux/reducers/payments";
import { setBruteGains, setNetGains } from "../../redux/reducers/gains";
import { toLocaleDate } from "./funcs";

const PaymentListItem = ({ payment }) => {
  // console.log(payment)
  // const {setCount,setPayments,setTOdayGains,todayGains,setTodayAmount} = useTodayPayments()

  const dispatch = useDispatch()
  const gains = useSelector((state) => state.gains);

  //console.log(paymentData)
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-gray-50">
      {/* Información del cliente */}
      <div className="flex items-center w-1/4">
        {/* Icono de cliente */}
        <PaymentIcon2 className="w-2 h-2 text-gray-500 mr-3" />
        <div>
          <h3 className="text-gray-700  text-md">{payment.nickname}</h3>
        </div>
      </div>

      <div className="flex items-center text-gray-500 w-1/4">
        <span className="text-sm font-semibold  font-medium">
          {payment.label}
        </span>
      </div>
      {/* Monto y estado */}
      <div className="flex items-center space-x-4 w-1/4">
        {/* Icono de monto */}
        <div className="flex items-center text-gray-500">
          <span className="text-lg font-semibold  font-medium">
            ${formatAmount(payment.amount)}
          </span>
        </div>

        {/* Estado */}
        <div className="flex flex-end w-1/4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              payment.status === "pending"
                ? "bg-primary text-white"
                : payment.status == "incomplete"
                ? "bg-warning text-white"
                : "bg-green-100 text-green-600"
            }`}
          >
            {payment.status == "paid"
              ? "pagada"
              : payment.status == "incomplete"
              ? "incompleta"
              : "pendiente"}
          </span>
        </div>
      </div>

      {/* Botón de acción */}

      <DropdownDefault right={true}>
        <button
          /*  disabled={payment.state === "payed"} */
          className={`flex items-center px-4 py-2  font-medium `}
          onClick={async () => {
            console.log(`Pagando ${payment.nickname}`);
            //console.log(payment)
            //console.log(payment.paymentId)
            const p =
              payment.status == "pending"
                ? "paid"
                : payment.status == "incomplete"
                ? "paid"
                : "pending";
            console.log(p);

            if (payment.status == "pending") {

              const res = await payPayment(payment.id, { id: payment.loan_id });
              console.log(res)

              console.log("payment.gains",payment)
              dispatch(setBruteGains(gains.bruteGains+payment.gain))
              dispatch(setNetGains(gains.netGains+payment.amount))

              dispatch(updatePayment({
                id: payment.id,
                payment: {
                  ...payment,
                  status: "paid",
                  payment_date: toLocaleDate(new Date()),
                  
                }
              }))
              // setTOdayGains((prev)=>todayGains+payment.gains)
              //setTodayAmount((prev)=>prev+payment.amount)

            } else if (payment.status == "incomplete") {
              console.log(p);

              const now = new  Date()

              const year =now.getFullYear();
              const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Añade un 0 al mes si es menor que 10
              const day = now.getDate().toString().padStart(2, '0');  // Añade un 0 al día si es menor que 10
              
              const res = await window.database.models.Payments.updatePayment({
                id: payment.id,
                status: "incomplete",
                paid_date: `${year}-${month}-${day}`,
                
              });

            } else {
              const res = await window.database.models.Payments.updatePayment({
                id: payment.id,
                status: "pending",
                paid_date: `NULL`,
              });

              dispatch(setBruteGains(gains.bruteGains-payment.gain))
              dispatch(setNetGains(gains.netGains-payment.amount))

              dispatch(updatePayment({
                id: payment.id,
                payment: {
                  ...payment,
                  status: "pending",
                  payment_date: undefined,
                  
                }
              }))
              console.log(res)
            }

            /* setPayments((prev) =>
              prev.map((e) => {
                console.log(e.id);
                return e.paymentId == payment.paymentId
                  ? {
                      ...e,
                      state: p,
                    }
                  : e;
              })
            ); */

          //  setCount((prev) => prev + 1);
          }}
        >
          {/* Icono de pagar */}
          <MoneyBillAlt className="w-5 h-5 mr-2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m3 9a9 9 0 100-18 9 9 0 000 18zm0-18v18"
          />

          {payment.status == "pending"
            ? "pagar"
            : payment.status == "incomplete"
            ? "pagar"
            : "pending"}
        </button>

        <IncompleteModal
          payment={payment}
          button={
            <button
              /*  disabled={payment.state === "payed"} */
              className={`flex items-center px-4 py-2  font-medium ${
                payment.status == "payed" ? "opacity-25" : ""
              }  `}
              disabled={payment.status == "payed"}
            >
              {/* Icono de pagar */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m3 9a9 9 0 100-18 9 9 0 000 18zm0-18v18"
                />
              </svg>
              incompleto
            </button>
          }
        ></IncompleteModal>
      </DropdownDefault>
    </div>
  );
};

export default PaymentListItem;
