import React, {useEffect} from 'react';
 

function Form({setInputText, inputText, setNewTask, newTask}) {

    const inputTextHandler = (e) => {
        setInputText(e.target.value.toLowerCase());
    };

     
    const submitTaskHandler = (e) => {

        e.preventDefault();
        
        const randomID = Math.random();
        if(inputText === "") {
            alert('Add a task')
        } else {
             
            setNewTask([...newTask, {text: inputText, completed: false, id: randomID}]);
            setInputText('');
            
            
        }
         
    };

    useEffect(() => {

        localStorage.setItem('tasks', JSON.stringify(newTask));
         
    }, [newTask])
     

    return (
        <div>
           <form onSubmit={submitTaskHandler} id="tasks-form" className="needs-validation">
                <div className="form-floating form-control-sm mb-3 rounded-0">
                    <input onChange={inputTextHandler} type="text" id="task-input" className="form-control  form-control-sm border-0 border-bottom border-1 border-secondary rounded-0 bg-transparent shadow-none" value={inputText}  placeholder="New Task"/>
                    <label htmlFor="task-input" className="ps-2 text-primary">New Task</label>
                    
                </div>

                <div id="button-div" className="d-flex justify-content-end align-items-center me-2">
                    <button type="submit"  id="add-task-btn" className="btn btn-sm btn-primary px-4">Add</button>

                </div>
            </form> 
        </div>
    )
}

export default Form;
