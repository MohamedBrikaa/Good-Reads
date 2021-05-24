import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";

const SERVER_URL = "http://localhost:5000"
function Searchauthors() {
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(true)
    const params = useParams()
    const authorName = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/author/` + authorName, setData,setFlag))

    }, [])
    if (data.length == 0) {
        return  <Link class="text-white text-center " style={{fontSize:"30px"}} to={"/"}><p class="bg-danger text-center mt-5 font-italic"> Name doesn't Exist, Back To Home</p> </Link>;
      }
    return (
        <div >
            <div className="column mb-3 m-3">
                {
                    data.map((author, index) =>
                     
                            <div class="row">
                                 {flag ? (  <div class="card mb-5 ml-3 mt-2">
                                <img src={`${SERVER_URL}/${author.authorImage}`} class="card-img m-auto" alt="Author Image." style={{ height: 200, width: 220 }} />
                                <div class="column ml-3">
                                    <h2 class=" card-title font-italic text-center ">{author.firstName} {author.lastName}</h2>
                                    <Link to={"/authorDetails/" + author._id} ><h2 class=" card-footer font-italic ">Go To Author Details</h2> </Link></div>

                            </div>
                            ): <Link  to={"/"}><p class="bg-danger  font-italic" style={{fontSize:"30px"}}>Name doesn't Exist, Back To Home</p> </Link>
                        }
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
    if (data.result.length == 0) {
        setFlag(false);
        console.log("flag")
    }
    else setFlag(true);




}
export default Searchauthors;