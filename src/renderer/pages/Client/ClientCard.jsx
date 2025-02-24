import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AddLoanModal } from './AddLoanModal';
import { useNotification } from '../../components/Notifications';
//import paymentsModel from '../../../database/models/Payments';
//import loansModel from '../../../database/models/Loans';
import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import EditModalClient from './EditClientModal';
//import Pagination from '../../components/Pagination'
//import Select from '../../components/Forms/SelectGroup/Select';
import  { EditIcon, UserIcon, StarIcon, PaymentIcon, WalletIcon,DeleteIcon } from '../../components/Icons';

import { deleteClientDb } from './funcs';
import { useDispatch, useSelector } from 'react-redux';
import { setClient,deleteClient } from '../../redux/reducers/clients';

export const ClientCard = () => {

    const {addNotification} = useNotification()
    const client = useSelector((state) =>{return state.clients.client});

    //const {nickname,id} = client
   
    const navigate = useNavigate()
  
    useEffect(() => {
  
    
      return () => {
  
      }
    }, [])
  
    return (
      <div className="max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        {/* Header */}
  
         <DropdownDefault left={true} >
  
          <EditModalClient
            button={<button
              className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
              <EditIcon></EditIcon>
              Edit
            </button>}
          ></EditModalClient>
  
          <button
  
            onClick={async () => {
              try {
  
                await deleteClientDb(client.id)
                dispatch(deleteClient({id:client.id}))
                navigate("/clients")
              } catch (error) {
                console.log(error)
              }
  
              navigate("/clients")
  
            }}
            className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
              <DeleteIcon></DeleteIcon>
            Delete
          </button></DropdownDefault> 
        <div className="flex justify-center  items-center">
          {/* Client Icon */}
          <div className="bg-blue-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
            <UserIcon></UserIcon>
  
          </div>
          {/* Client Info */}
  
        </div>
        <div className="ml-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">{client?client.nickname:""}</h3>
  
        </div>
        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>
        <h3 className='text-center text-lg'> Informacion</h3>
  
       {/*  <p>
          nombre y apellido : {client.name + " " + client.lastname}
        </p>
        <p>
          telefono : {client.phone}
        </p>
        <p>
          email : {client.email}
        </p>
        <p>
          direccion : {client.address}
        </p> */}
  
        <div className="my-4 border-t border-gray-200"></div>
        {/* Rating Section 
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Rating:</p>
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
          </div>
        </div>*/}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Rating:</p>
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} filled={i < 5} />
              ))}
          </div>
        </div>
  
        {/* Action Button */}
        <div className="text-center">
  
        </div>
      </div>
    );
  };
  