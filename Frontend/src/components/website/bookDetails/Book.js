import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import ReactStars from 'react-rating-stars-component';
import {Redirect} from 'react-router-dom';


const bookId = window.location.pathname.split('/')[2]
const token = sessionStorage.getItem('userToken');
const SERVER_URL = "http://localhost:5000"
function Book() {
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState({})
  const [author, setAuthor] = useState({})
  const [myRating, setMyRating] = useState({})
  const [userReview, setUserReview] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const params = useParams()
  const bookId = params.id;
  const token = sessionStorage.getItem('userToken');
  const [redirectPage,setRedirectState]= useState(null)

  const getBookRating = () => {
   
      axios.get(`${SERVER_URL}/ratings/` + token + "/" + bookId)
        .then(res => {
          if (res.status === 200 && res.data) {
            setMyRating(res.data.value)
          }
          else {
            setMyRating(0)
          }
        })
}
  const getShelve = () => {
    
      axios.get(`${SERVER_URL}/shelve/` + token + "/" + bookId)
        .then(res => {
          if (res.status === 200 && res.data) {
            setSelectedOption(res.data.state)
          }
          // else {
          //   alert("You need to login first....")
          //  // setSelectedOption("")
          // }

        })
  }
  useEffect(() => {

    console.log(fetchData(`${SERVER_URL}/books/` + bookId, setData, setCategory, setAuthor, setReviews))
    getBookRating(); // lo mfesh token msh hygeb de
    getShelve();//lo mfesh token brdo msh hygeb de

  }, [])
  const handleSubmit = (e) => {  //el function de bta3t el review msh hy3rf y add review lo mfesh token
   if(token != null){
    e.preventDefault();
    axios.post(`${SERVER_URL}/reviews/` + token, {
      bookId,
      userReview,
    })
      .then(res => {
        if (res.status === 200) {
          console.log("ad",res.data)
          setReviews(res.data)
        }
        else {
          alert("Please,Login to add Your Review ")
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }else{
      alert("You need to login first....")
      setRedirectState('/')
    }
  }
  const ratingChanged = (value) => { //hena msh hy3rf y8er el rating brdo

    if(token != null){
      axios.post(`${SERVER_URL}/ratings/` + token, { bookId, value })
        .then(res => {
          console.log("The user rating " + res.data); // el rating ya basha <3
          window.location.reload()
        })
    }
    else{
      alert("You need to login first....")
      setRedirectState('/')
    }
  }
  const shelveOption = (e) => { //hena msh hy3rf y8er el shelve bta3oooo
    if(token != null){
      console.log("value",e.target.value);
      const state=e.target.value;
      console.log(state)
      console.log("book",bookId)
      axios.post(`${SERVER_URL}/shelve/` + token, { bookId, state })
        .then(res => {
          console.log(res.data)
          setSelectedOption(res.data)
        })
        .catch(function (error) {
          console.log(error);
        })
  }
  else {
    alert("You need to login first....")
    setRedirectState('/')
  }

  }


  if(redirectPage)return  <Redirect  to="/" /> 

  return (
    <React.Fragment>
      <div class="mb-3 m-3" >
        <div class="row no-gutters">
          <div class="col-md-2 ">
            <img src={`${SERVER_URL}/${data.bookImage}`} class="card-img" alt="..." style={{ height: 200, width: 220 }} />
            <div class="mt-2">
            <select  onChange={shelveOption} >
              <option value= '' selected = {selectedOption === ''}> </option>/>
              <option value= 'Read' selected = {selectedOption === 'Read'}>Read</option>/>
              <option value= 'Want To Read'  selected = {selectedOption === 'Want To Read'}>Want To Read</option>/>
              <option value= 'Currently Reading'  selected = {selectedOption === 'Currently Reading' }>Currently Reading</option>/>
            </select>
      
            </div>
            <div class="mt-2 column">
              <p class="card-text"><small class="text-muted">my Rating</small></p>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                value={myRating} />
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-dark font-weight-bold">{data.name}</h5>
              <p class=" text-dark  ">By:  <Link class="text-info" to={"/authorDetails/" + author._id}>{author.firstName} {author.lastName} </Link> </p>
              <p class=" text-dark"> Category: <Link class="text-info" to={"/categories/" + category._id}>{category.catName} </Link> </p>
              <p class=" text-dark"> {data.bookDetails ? data.bookDetails:""} </p>
              <div class="row ml-3">
                <ReactStars
                  count={5}
                  value={data.totalRatingValue / data.totalRatingCount}
                  size={24}
                  edit={false}
                  color2={'#ffd700'} />
                <p class="mt-2  ml-3">{data.totalRatingValue / data.totalRatingCount} - {data.totalRatingCount}  ratings</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title bg-warning font-italic text-center">Reviews</h5>
          {
            reviews.map((review, index) =>

              <div key={index}class="row ml-3" >
<p class="font-weight-bold text-dark text-center">{review.user.firstName} {review.user.lastName} : </p> 
                <p class=" font-italic ">{review.text}</p>

              </div>

            )}
        </div>
        <form class="form-inline col-4 my-2 my-lg-0 m-auto mb-3" onSubmit={handleSubmit}>
          <input class="form-control mr-sm-2" placeholder="Your Review" aria-label="Review" value={userReview} onChange={e => setUserReview(e.target.value)}></input>
          <button class="btn btn-warning  m-auto my-2 my-sm-0" type="submit">Add Review</button>
        </form>
      </div>

    </React.Fragment>
  );
}
async function fetchData(url, setData, setCategory, setAuthor, setReviews) {
  let response = await fetch(url)
  let data = await response.json();
  console.log("books-data", data);

  setData(data.book);
  setCategory(data.book.category)
  setAuthor(data.book.author)
  setReviews(data.bookReviews)

  const avgRating = (data.book.totalRatingValue / data.book.totalRatingCount)
  console.log("The Average: " + avgRating);
}

export default Book;
