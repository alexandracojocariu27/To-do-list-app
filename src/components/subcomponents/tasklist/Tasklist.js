import React from 'react';
import Task from "../../subcomponents/task/Task"

function Tasklist({newTask, setNewTask, searchResults}) {
     
    return (
        <div>
            <ul id="tasks-area" className=" list-group d-flex flex-column mt-1">
                 
                {searchResults.map((task, key) => <Task task={task} newTask={newTask} setNewTask={setNewTask} text={task.text} key={task.id}></Task>)}
            </ul>
        </div>
    )
}

export default Tasklist;
