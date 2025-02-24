
import React,{ useState,useEffect } from "react";
import { useNotification } from "../../../components/Notifications";
import { useModal } from "../../../components/Modal";
import { useGuide } from "../../../components/GuidedForm/GuidedForm";

import SelectGroupOne from "../../../components/Forms/SelectGroup/SelectGroupOne";



const Step4 = ({ setLoans }) => {
    const [notifications, setNotifications] = useState([]);
  
    const { setNotification, showNotification } = useNotification()
    const { toggleModal } = useModal()
    const { formData, disableNext, nextStep,goToStep, handleChange, enableNext, registerOnNext,registerOnBack, validate, setField } = useGuide()
  
  
    useEffect(() => {
  
      enableNext()
      // Registra el callback para este paso
      registerOnNext(async () => {
        console.log("Callback ejecutado desde Step4");
  
        //if(formData.pagos.value=="custom") nextStep()
          
         const errors = await validate({
          payment_interval: {
            required: {
              param: true,
              message: "Este campo es requerido para avanzar",
  
            },
  
          }
        })
  
  
        if (errors) {
  

          if(formData.payment_interval.value == "custom") nextStep()
  
          else {
           goToStep(6)
          }
  
        } else return
  
      });
    }, [registerOnNext]);
    return (
  
      <div className="mb-4">
  
        <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
            Que periodo desean que se paguen las cuotas?
        </h3>
        <div className="relative">
  
          <SelectGroupOne onChange={(e) => {
            setField({ type: "set", field: "payment_interval", value: e.target.value })
  
          }} ></SelectGroupOne>
          {/* <Modal button={false}>
             
            </Modal> */}
  
  
          <p className="text-center text-red ">
            {
              formData.payment_interval.error ? formData.payment_interval.error : ""
            }
          </p>
        </div>
  
  
  
      </div>
  
  
    )
  }

  export default Step4;