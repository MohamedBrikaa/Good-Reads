import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import ReactStars from 'react-rating-stars-component'
const SERVER_URL = "http://localhost:5000"
const bookname = window.location.pathname.split('/')[2]
function Searchbooks() {
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(true)
    const params = useParams()
    const bookname = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/book/` + bookname, setData,setFlag))
    
      }, [])


      if (data.length == 0) {
        return  <Link class="text-white text-center " style={{fontSize:"30px"}} to={"/"}><p class="bg-danger text-center mt-5 font-italic"> Name doesn't Exist, Back To Home</p> </Link>;
      }

    return (
        <div >
        <div className="column mb-3 m-3">
        {
            data.map((book, index) =>
<div class="card mb-5">
<div class="row">
  {flag ? (<div>
    <div class="row ">
              <img src={`${SERVER_URL}/${book.bookImage}`} class="card-img" alt="..." style={{ height: 200, width: 220 }}/>
              <div class="column ml-3">
              <h2 class=" card-title font-italic ">{book.name}</h2>
                <p class=" text-dark ">By:  <Link class="text-info" to={"/authorDetails/" + book.author._id}>{book.author.firstName} {book.author.lastName} </Link> </p>
              <p class=" text-dark"> Category: <Link class="text-info" to={"/categories/" + book.category._id}>{book.category.catName} </Link> </p>
              
                <p> average ratings</p>
              <ReactStars
                  count={5}
                  value={book.totalRatingValue / book.totalRatingCount}
                  size={24}
                  edit={false}
                  color2={'#ffd700'} />
                  </div>
                  
              </div>
              <Link to={"/books/" + book._id} ><h2 class=" card-footer font-italic ">Go To Book Details</h2> </Link>
                  </div>
                  
  ): <Link  to={"/"}><p class="bg-danger  font-italic" style={{fontSize:"30px"}}>Name doesn't Exist, Back To Home</p> </Link>}
                  </div>
</div>
            )}
            
        </div>
      </div>

    
        )
}
async function fetchData(url, setData,setFlag) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("books-data", data);
  
    setData(data.result);
    if (data.result.length  == 0){
      setFlag(false);
      console.log("flag")
    }
    else setFlag(true);
  
 
  }
  
export default Searchbooks;
