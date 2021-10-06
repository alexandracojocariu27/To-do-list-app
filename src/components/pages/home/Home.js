import React, {useState, useEffect} from "react";
import "./Home.css";


import Form from "../../utilities/form/Form";
import Filter from "../../utilities/filter/Filter";
import Tasklist from "../../utilities/tasklist/Tasklist";
import Search from "../../utilities/search/Search";
import Pagination from "../../utilities/pagination/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTasks } from '@fortawesome/free-solid-svg-icons';
 
 

const Home = () => {

    // States
    const lsTasks = JSON.parse(localStorage.getItem('tasks')) !== null ? JSON.parse(localStorage.getItem('tasks')) : [];

    const [inputText, setInputText] = useState('');
    const [newTask, setNewTask] = useState(lsTasks);
    const [status, setStatus] = useState('All');
    const [filteredTasks, setFilteredTasks] = useState([]);
    
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(3);
     
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPageItems = newTask.slice(indexOfFirstItem, indexOfLastItem);

     
    
    useEffect(() => {
        if(localStorage.getItem('userEmail') === null) {
            window.location.href="/login";
        }
    },[])

     


    // Functions
 
    const clearAllHandler = () => {

        const confirmeDelete = window.confirm("Delete all tasks?");

        if(confirmeDelete === true) {
            if(status === 'All') {
                setNewTask([])
            } else if(status === 'Completed') {
                setNewTask(newTask.filter((item) => item.completed !== true))
            } else if(status === 'Uncompleted') {
                setNewTask(newTask.filter((item) => item.completed !== false))
            }
        }
    
    };

    
    // Filter
    const filterHandler = () => {

        switch(status) {
            case 'Completed':
                setFilteredTasks(currentPageItems.filter((item) => item.completed === true))
                break;
            case 'Uncompleted':
                setFilteredTasks(currentPageItems.filter((item) => item.completed === false))
                break;
            case 'All':
                setFilteredTasks(currentPageItems)
                break;
            default:
                setFilteredTasks(currentPageItems)
                break;
             
        }
    };

    useEffect(() => {
        filterHandler();    
    }, [newTask, status, currentPage])

    useEffect(() => {
        searchHandler();    
    }, [filteredTasks, searchInput])

     
    // Search
    const searchHandler = () => {
        
        if(searchInput !== " ") {

            setSearchResults(filteredTasks.filter((item) => item.text.includes(searchInput)));
        } else {
            setSearchResults(filteredTasks);
        }
    }
    
      
    return(
        <div id="home-div" className="min-vh-100 d-flex justify-content-center align-items-center">

            <div id="to-do-card" className="col-11 col-md-9 col-xl-7" >

                <div id="header" className="d-flex justify-content-center align-items-center bg-dark py-1">
                    <FontAwesomeIcon icon={faTasks} color="#617DB7" size="2x" className="me-3" />
                    <h1 id="home-title" className=" text-white fs-3 d-flex justify-content-center align-items-center">to do list</h1>

                </div>

                <div id="tasks-container" className="bg-white d-flex flex-column justify-content-center">
                    <h3 id="tasks-title" className="fs-5 ps-2 mt-2">Tasks</h3>

                    {/* SEARCH */}
                    <Search setSearchInput={setSearchInput}></Search>
                    
                    {/*TASKLIST  */}
                    <Tasklist newTask={newTask} setNewTask={setNewTask} searchResults={ searchResults} setSearchResults={setSearchResults}  ></Tasklist>

                    {/* FORM */}

                    <Form newTask={newTask} setNewTask={setNewTask} inputText={inputText} setInputText={setInputText}></Form>

                    {/* FILTER */}

                    <Filter setStatus={setStatus} newTask={newTask} setNewTask={setNewTask}></Filter>

                    <div id="button-div" className="d-flex justify-content-start align-items-center ms-2">
                        <button onClick={clearAllHandler} id="clear-tasks-btn" className="btn btn-sm btn-dark px-4" type="button">Clear all</button>
                    </div>

                    {/* PAGINATION */}
                    <Pagination totalItems={newTask.length} itemsPerPage={itemsPerPage} setcurrentPage={setcurrentPage}></Pagination>

                </div>
            </div>

        </div>
    )
};

export default Home;
