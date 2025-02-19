
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ pageName }) => {

  const navigate = useNavigate()
  
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
     
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
       <button onClick={()=>navigate(-1)}> atras </button>   <button onClick={()=>navigate(+1)}>Sig</button> 
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
