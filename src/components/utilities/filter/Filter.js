import React, {useRef, useEffect} from 'react'

function Filter({setStatus}) {

     const elRef = useRef();
    const statusHandler = (e) => {
        setStatus(e.target.value);

        localStorage.setItem('lastFilterChoice', e.target.value);
    };
    
    const lastFilterChoice = localStorage.getItem('lastFilterChoice');

    useEffect(() => {
        elRef.current.value = lastFilterChoice === null ? 'All' : lastFilterChoice;
        setStatus(lastFilterChoice)
    }, [])

    return (
        <div>
            <div id="filter-div" className="">

                <div className="form-floating form-control-sm mb-3 rounded-0">
                    <select ref={elRef} onChange={statusHandler} className="form-select form-select-sm border-0 border-bottom border-1 border-secondary rounded-0 bg-transparent shadow-none px-1" id="filter" aria-label="filter">
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Uncompleted">Uncompleted</option>
                    </select>
                    <label htmlFor="filter" className="text-primary fs-6">Filter</label>
                </div>

                 
            </div>
        </div>
    )
}

export default Filter;
