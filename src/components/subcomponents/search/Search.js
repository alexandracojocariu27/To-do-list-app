import React from 'react';

function Search({setSearchInput}) {

     
    const searchInputHandler = (e) => {

        setSearchInput(e.target.value);
    }
    
    return (
        <div>
           <div id="search-div" className="">

                <div className="form-floating form-control-sm mb-3 rounded-0">
                    <input onChange={searchInputHandler} type="text" id="search-input" className="form-control  form-control-sm border-0 border-bottom border-1 border-secondary rounded-0 bg-transparent shadow-none" placeholder="Search task"/>
                    <label for="search-input" className="ps-2 text-primary">Search task</label>
                </div>

                 
            </div>  
        </div>
    )
}

export default Search;
