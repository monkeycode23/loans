import { current } from "@reduxjs/toolkit";
import React,{useState} from "react";

const PanelWithPagination = () => {
    // Estados para manejar la búsqueda y paginación
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  
  
  
   // const itemsPerPage = 5;
  
    // Filtrar los datos basados en la búsqueda
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  
    // Calcular los datos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  
    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Header con el Input de búsqueda */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Panel de Clientes</h2>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
  
       
      
      </div>
    );
  };
  
  

  function Pagination({currentPage,totalPages,changePage}) {


    const elipsePagination=()=>{

      const firstPages= (
       <>
        <button
        
        className={`px-3 py-1 mx-1 rounded-lg ${
          currentPage === 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => changePage(1)}
      >
        {1}
      </button>
      <button
        
        className={`px-3 py-1 mx-1 rounded-lg ${
          currentPage === 2
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => changePage(2)}
      >
        {2}
      </button>
      <button
        
        className={`px-3 py-1 mx-1 rounded-lg ${
          currentPage === 3
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => changePage(3)}
      >
        {3}
      </button>
       </>
      )

      const lastPages= (
        <>
         <button
         
         className={`px-3 py-1 mx-1 rounded-lg ${
           currentPage === totalPages-1
             ? "bg-blue-500 text-white"
             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
         }`}
         onClick={() => changePage(1)}
       >
         {totalPages-1}
       </button>
       <button
         
         className={`px-3 py-1 mx-1 rounded-lg ${
           currentPage === totalPages
             ? "bg-blue-500 text-white"
             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
         }`}
         onClick={() => changePage(2)}
       >
         {totalPages}
       </button>
      
        </>
       )


       return (<>
        {firstPages}
        {
          currentPage>3  && currentPage<(totalPages-1)?
          (<>
          ...
          <button
        
        className={`px-3 py-1 mx-1 rounded-lg  bg-blue-500 text-white hover:bg-gray-300`}
       /*  onClick={() => changePage(currentPage)} */
      >
        {currentPage}
      </button>
         ... </>)
          :
          (<>...</>)
        }
        {lastPages}
       </>)
    }

    return (
      <>
      
      
        {/* Paginación */}
        <div className="flex flex-row justify-end  items-center">
          <button
            className={`px-3 py-1 mx-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
            onClick={() => changePage((prev) => prev - 1)}
          >
            ante
          </button>
          {
            totalPages<10 ? (
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 mx-1 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => changePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))
            ):(<>
            
            {elipsePagination()}
            </>)
          }
          <button
            className={`px-3 py-1 mx-1 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => changePage((prev) => prev + 1)}
          >
            sig
          </button>
        </div>
      </>
    )
  }
  
  export default Pagination
  
  