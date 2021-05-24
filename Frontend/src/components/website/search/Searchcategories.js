import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
const SERVER_URL = "http://localhost:5000"
const catName = window.location.pathname.split('/')[2]
function Searchcategories() {
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(true)

    const params = useParams()
    const catName = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/category/` + catName, setData,setFlag))
    
      }, [])


      if (data.length == 0) {
        return  <Link class="text-white text-center " style={{fontSize:"30px"}} to={"/"}><p class="bg-danger text-center mt-5 font-italic"> Name doesn't Exist, Back To Home</p> </Link>;
      }
    return (
        <div >
                       <div class="row  m-5 d-flex justify-content-around text-center">
                {
                data.map((category, index) =>
                <div key={index} class="card bg-info mb-3 p-3 " style={{ width: 300 }}>
      
      {flag ? (   <div> <Link  class=" text-white  font-italic " style={{fontSize:25 }} to={"/categories/" + category._id}>{category.catName}</Link>
    
        <Link  to={"/categories/" + category._id} ><h2 class="bg-light card-footer font-italic ">Go To Category Details</h2> </Link>
      </div>
      ) : 
        <Link  to={"/"}><p class="bg-danger  font-italic" style={{fontSize:"30px"}}>Name doesn't Exist, Back To Home</p> </Link>
      }
    </div>
    
                 ) }
                </div>
      </div>

    
        )
}
async function fetchData(url, setData,setFlag) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("data", data);
  
    setData(data.result);
  console.log(data.result)
  console.log(data.result.length)
  if (data.result.length  == 0){
    setFlag(false);
    console.log("flag")
  }
  else setFlag(true);
  
 
  }
  
export default Searchcategories;
