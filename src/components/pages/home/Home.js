import React, {useState, useEffect} from "react";
import "./Home.css";
import axios from "axios";
 

import Form from "../../subcomponents/form/Form";
import Filter from "../../subcomponents/filter/Filter";
import Tasklist from "../../subcomponents/tasklist/Tasklist";
import Search from "../../subcomponents/search/Search";
import Pagination from "../../subcomponents/pagination/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTasks } from '@fortawesome/free-solid-svg-icons';
 
 
 

 
const Home = () => {

    // States
    const [inputText, setInputText] = useState('');
    const [newTask, setNewTask] = useState([]);
    const [status, setStatus] = useState('All');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId')); 
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    
    
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPageItems = newTask.slice(indexOfFirstItem, indexOfLastItem);

     
    
    useEffect(() => {
        if(localStorage.getItem('userId') === null) {
            window.location.href="/login";
        }
    },[])

    useEffect(() => {

        const userTasks = [];
        axios.post('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/actionsOfUser', {
            personId: userId, 
        })
        .then(res => {

            if(JSON.stringify(res.data) !== '{}') {

                res.data.forEach((item) => {
    
                    userTasks.push({text:item.name, completed:item.isDone, id:item.id});
    
        
                })
                setNewTask(userTasks);
                
            } 

            
        })
    }, [])


    // Functions
 
    const clearAllHandler = () => {

        const confirmeDelete = window.confirm("Delete all tasks?");

        if(confirmeDelete === true) {

            searchResults.forEach((item,index) => {
                axios.delete('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/action', {
                    data: {
                        id: item.id
                    } 
                             
                })
                .then(res => {
                    
                    console.log(res); 
                     
                     
                })

                setNewTask([]);
                
                
            })    
        }

         
    };

    
    useEffect(() => {
        filterHandler();    
    }, [newTask, status, currentPage])


    // Filter
    const filterHandler = () => {

        switch(status) {
            case 'completed':
                setFilteredTasks(currentPageItems.filter((item) => item.completed === true))
                break;
            case 'uncompleted':
                setFilteredTasks(currentPageItems.filter((item) => item.completed === false))
                break;
            default:
                setFilteredTasks(currentPageItems)
                break;

             
        }
    };

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

                    <Form newTask={newTask} setNewTask={setNewTask} inputText={inputText} setInputText={setInputText} userId={userId}></Form>

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
