import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
//import img4 from './longest.jpg'
import axios from 'axios';
import { useParams } from "react-router";
import { Redirect , Link} from 'react-router-dom';


function AuthorDetails() {

  const params = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [details, setDetails] = useState("");
  const [authorImg, setImg] = useState("");
  const [arr, setarr] = useState([]);
  const [redirectPage, setRedirectState] = useState(null)

  let userRating = 0;
  const authorId = params.id;
  const token = sessionStorage.getItem('userToken');

  const getAuthorsInfo = () => {

    axios.get("http://localhost:5000/" + 'authors/' + authorId)
      .then(res => {
        setfirstName(res.data.firstName)
        setlastName(res.data.lastName)
        setDetails(res.data.details)
        setImg("http://localhost:5000/" + res.data.authorImage)
        console.log("http://localhost:5000/" + res.data.authorImage);
        // setarr(res.data.books)
        // console.log(url+res.data.photo);

      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const getAuthorsBooks = () => {
    console.log("athou erwjhkwrk;l");

    axios.get("http://localhost:5000/books/author/details/" + authorId + '/?token=' + token)
      .then(res => {
        setarr(res.data)
        console.log(res.data);
        userRating = res.data.rating;
        console.log("DII L BOOKS L GAT YA NOUR");

        console.log(res.data);

      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const handleSelectChange = (e, bookId) => {
    console.log(token);

    if (token != null) {
      const value = e.target.value;
      axios.post("http://localhost:5000/shelve/" + token, { "state": value, bookId })
        .then(res => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    else {
      alert("You need to login first....")
      setRedirectState('/');
    }
  }
  const handleRatingChange = (e, bookId) => {
    if (token != null) {
      userRating = e;
      axios.post("http://localhost:5000/ratings/" + token, { "value": userRating, bookId })
        .then(res => {
          console.log(res.data);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
    } else {
      alert("You need to login first....")
      setRedirectState('/')
    }
  }
  useEffect(() => {

    getAuthorsInfo()
    getAuthorsBooks()

  }, []);
  if (redirectPage) return <Redirect to="/" />
  return (<div>

    <Card class="mt-3 ml-5">

      <Card.Title class="ml-5"><h1> {firstName}  {lastName} </h1></Card.Title>
      <Card.Body class="ml-5">
        <Row style={{ height: '150px' }}>

          <Card.Img src={authorImg} style={{ width: '150px', height: '150px' }} />

          <Col>
            <Card.Text >
           

              {details}

            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    <br />


    <h3 class="font-italic  bg-warning text-center">Authors Books!</h3>
    <div class="ml-5 card-columns">
      {! arr.length && <p>This author has no books yet.</p>}
      { arr.map((item) => {
        userRating = item.rating
        return <Card style={{ display: 'inline-block', marginRight: "10px" }} >

          <Card.Body>
           <Card.Title class="text-center mb-2 font-italic font-weight-bold"> <Link to={"/books/"+item.book._id}>{item.book.name}</Link></Card.Title>
            <Card.Img class="m-auto" src={"http://localhost:5000/" + item.book.bookImage} style={{ display: "block", width: '150px', height: '150px' }} />
            <Card.Text style={{ marginLeft: "150px" }}>
             
                  <div class="mt-2">
                <ReactStars
                  count={5}
                  edit={false}
                  size={18}
                  color1={'grey'}
                  color2={'yellow'}
                  value={item.book.totalRatingValue / (item.book.totalRatingCount)}
                />
              </div>
              {item.book.totalRatingCount} ratings
            </Card.Text >

          </Card.Body>
          <Card.Text style={{ marginLeft: "150px" }}>
            Rate the book!
          </Card.Text>

          <div class="mt-2 " style={{ marginLeft: "150px" }}>
            <ReactStars
              count={5}
              edit={true}
              onChange={(e) => handleRatingChange(e, item.book._id)}
              size={24}
              color1={'grey'}
              color2={'yellow'}
              value={userRating}
            />

          </div>


          <select  style={{ marginLeft: "130px" }} onChange={(e) => handleSelectChange(e, item.book._id)} >
            <option value='' selected={item.shelve === ''}></option>/>
        <option value='Read' selected={item.shelve === 'Read'}>Read</option>/>
        <option value='Want To Read' selected={item.shelve === 'Want To Read'}>Want To Read</option>/>
        <option value='Currently Reading' selected={item.shelve === 'Currently Reading'}>Currently Reading</option>/>
        </select>

        </Card>
      })}
    </div>

  </div>);
}


export default (AuthorDetails);
