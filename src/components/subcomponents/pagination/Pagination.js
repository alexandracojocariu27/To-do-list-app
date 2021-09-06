import React from 'react'
import "./Pagination.css";

const Pagination = ({totalItems, itemsPerPage, setcurrentPage}) => {

    const pageNumbers = [];
    
    const pages = document.querySelectorAll('.page-item');
  
    for(let i = 0; i< pages.length; i++) {
        
        pages[i].addEventListener('click', function() {
            setcurrentPage(pages[i].id);

             
            let current = document.querySelectorAll(".active");

            if(current.length > 0) {
                current[0].classList.remove('active');
            }

            pages[i].classList.add('active'); 
        })   
    }
     

    
    for(let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
        pageNumbers.push(i);
       
    }

    return (
        <div>
          <ul className="pagination mt-2 d-flex justify-content-center">
            {pageNumbers.map(number => (
                <li id={number} key={number} className="page-item"><a className="page-link" href="#">{number}</a></li>
            ))}
        </ul>  
        </div>
    )
}

export default Pagination;
