import React from 'react'

function Filter({setStatus}) {

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }     
    return (
        <div>
            <div id="filter-div" className="">

                <div className="form-floating form-control-sm mb-3 rounded-0">
                    <select onChange={statusHandler} className="form-select form-select-sm border-0 border-bottom border-1 border-secondary rounded-0 bg-transparent shadow-none px-1" id="filter" aria-label="filter">
                        <option defaultValue>All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                    <label for="filter" className="text-primary fs-6">Filter</label>
                </div>

                 
            </div>
        </div>
    )
}

export default Filter;
