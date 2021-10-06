import React, {useRef, useEffect} from 'react'
import "./Pagination.css";

const Pagination = ({totalItems, itemsPerPage, setcurrentPage}) => {

    // add page numbers
    const pageNumbers = [];
    
    
    for(let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
        pageNumbers.push(i);   
    }
    
    // set current page
    const pages = useRef();
    
    const paginate = (e) => {
        
        e.preventDefault();

        setcurrentPage(e.currentTarget.id); 

        localStorage.setItem('lastPage', e.currentTarget.id);

        // highlight current page
        pages.current.childNodes.forEach((page) => {
            if(page.id !== e.currentTarget.id) {
                page.classList.remove('active')

            }   
        })
        
        e.currentTarget.classList.add('active');           
    }
    
    // keep the active page at refresh
    const lsPageNumber = Number(localStorage.getItem('lastPage'));
    const lastActivePage = lsPageNumber === 0 ? 1 : lsPageNumber;
 

    useEffect(() => {
        setcurrentPage(lastActivePage)
        
    }, [])
    
    

    return (
        <div>
          <ul ref={pages} className="pagination mt-2 d-flex justify-content-center">
            {pageNumbers.map(number => (
                <li onClick={paginate} id={number} key={number} className={number === lastActivePage ? "page-item active" : "page-item"}><a className="page-link shadow-none" href="#">{number}</a></li>
            ))}
        </ul>  
        </div>
    )
}

export default Pagination;
