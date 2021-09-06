import React from 'react';
import axios from "axios";

function Form({setInputText, inputText, setNewTask, newTask, userId}) {

     

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

     
    const submitTaskHandler = (e) => {

        e.preventDefault();
        
         
        if(inputText === "") {
            alert('Add a task')
        } else {
            axios.post('https://todo-application-2.herokuapp.com/action', {
                name: inputText,
                isDone: false,
                personId: userId,
            
                         
            })
            .then(res => {
    
                setNewTask([...newTask, {text: res.data.name, completed:res.data.isDone, id: res.data.id}]);
                setInputText('');
                    
            })
                
        }
         
    };

     

    return (
        <div>
           <form onSubmit={submitTaskHandler} id="tasks-form" className="needs-validation">
                <div className="form-floating form-control-sm mb-3 rounded-0">
                    <input onChange={inputTextHandler} type="text" id="task-input" className="form-control  form-control-sm border-0 border-bottom border-1 border-secondary rounded-0 bg-transparent shadow-none" value={inputText}  placeholder="New Task"/>
                    <label for="task-input" className="ps-2 text-primary">New Task</label>
                    
                </div>

                <div id="button-div" className="d-flex justify-content-end align-items-center me-2">
                    <button type="submit"  id="add-task-btn" className="btn btn-sm btn-primary px-4">Add</button>

                </div>
            </form> 
        </div>
    )
}

export default Form;
