import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";

const SERVER_URL = "http://localhost:5000"
function Search() {
    const [userSearch, setUserSearch] = useState("")
    const [bookId, setbookId] = useState("")
    const [selectedOption, setSelectedOption] = useState("");



    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userSearch);
        
    }

const change =(e)=>{
    setUserSearch(e.target.value)


}
const selectOption = (e) => { 
  console.log("value",e.target.value);
  const state=e.target.value;
  console.log(state)

      setSelectedOption(e.target.value)
  

}

    return (

        <form class="form-inline col-5 my-1 my-lg-0" onSubmit={onSubmit}>
        
        <input class="form-control mr-sm-1 my-1" type="search" placeholder="Search" aria-label="Search" value={userSearch} onChange={e => change(e)}></input>
        <select class="form-control  border rounded ml-2 mr-2" name="search" onChange={selectOption}>
            <option value="" selected = {selectedOption === ''}></option>
          <option value="category" selected = {selectedOption === 'category'}>Category</option>
          <option value="book" selected = {selectedOption === 'book'} >Book</option>
          <option value="author" selected = {selectedOption === 'author'} >Author</option>
        </select>
        <Link to ={'/search/'+selectedOption+"/"+userSearch}> <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" >Search</button> </Link>
            
        </form>

    );
}

export default Search;
