import React from 'react';
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes } from '@fortawesome/free-solid-svg-icons';
 

function Task({text, task, newTask, setNewTask}) {

    const deleteHandler = () => {

        setNewTask(newTask.filter((item) => item.id !== task.id));

        axios.delete('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/action', {
            data: {
                id: task.id
            } 
                     
        })
        .then(res => {
             
            console.log('DELETE', res);
        })  
         
             
    };

    const completeHandler = () => {
        setNewTask(newTask.map((item) => {

            if(item.id === task.id) {
                return {
                    ...item, completed: !item.completed     
                }

            } else {
                return item;
            }

             
        }))

        

             
            axios.put('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/action', {
                 
                id: task.id,
                isDone: !task.completed,
                  
                         
            })
            .then(res => {
                 
                console.log('PUT',res);
            })  
         
             
    }; 


    return (
        <div>
             
            <div className="list-item-div d-flex align-items-center justify-content-between">
                <li className="list-group-item border-0"><input onChange={completeHandler}  className="form-check-input me-1 shadow-none" type="checkbox" value="" aria-label="task" checked={task.completed === true ? true : false}></input >{text}</li>
    
                <button onClick={deleteHandler} type="button" className=" btn btn-link shadow-none me-5"> <FontAwesomeIcon icon={faTimes} /></button>
             </div>
             
        </div>
    )
}

export default Task;
