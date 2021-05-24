import React ,{useState, useEffect } from 'react';
import {Card  } from 'react-bootstrap'
import {Link } from 'react-router-dom';
import axios from 'axios';
function Authors() {
    const [arr,setArr] = useState([])

    const getAllAuthors = ()=>{

      let url="http://localhost:5000/";
  
      axios.get(url+'authors/')
      .then(res => {   
        setArr(res.data)
        console.log(res.data);
      })
    }
    
    useEffect(()=>{ 
     getAllAuthors() 
    }, []);
  
    
    return (<React.Fragment>
    <h1 class="text-center font-italic mt-3 bg-warning">Authors</h1>
    <div class="mt-5 ml-5 d-flex justify-content-center">
        
        <div class="card-columns ml-5">
        {arr.map((item)=>{
            return <Card style={{ width: '20rem' , display : 'inline-block' , marginRight:'10px'}}>
            <Card.Body >
              <Card.Title class="text-center mb-2 font-italic font-weight-bold">{item.firstName} {item.lastName}</Card.Title>
              <Card.Img class="m-auto"src={"http://localhost:5000/"+item.authorImage} style={{width:'150px', height:'150px',display:"block"}} />        
              </Card.Body>
              <Card.Footer> <Link style={{marginLeft:'20%'}} to={"/authorDetails/"+item._id} >Go To Author Details</Link>
              </Card.Footer>
          </Card>
        })}
        </div>
    </div>
    </React.Fragment>);
}
export default Authors;
