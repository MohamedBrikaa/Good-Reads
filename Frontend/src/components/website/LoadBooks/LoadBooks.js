import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component';
const SERVER_URL = "http://localhost:5000"



function LoadBooks() {
  const [books, setBooks] = useState([])
  const getBooks = () => {

    axios.get(`${SERVER_URL}/books`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(res.data.books)
          setBooks(res.data.books)
        }


      })
  }
  useEffect(() => {


    getBooks();

  }, [])

  return (<div >
  <h1>Popular Books!</h1>
    {books.map((item) => {
      return <Card style={{ width: '17rem', display: 'inline-block', marginRight: '10px' }}>
        <Card.Body>
          <Card.Img src={`${SERVER_URL}/${item.book.bookImage}`} class="card-img" style={{height:"200px"}}>

          </Card.Img>
          <Row style={{justifyContent:'center'}}>
            <Card.Link  href={"/authorDetails/" + item.book.author._id}>{item.book.author.firstName} {item.book.author.lastName}</Card.Link>
          </Row>
          <Row style={{justifyContent:'center'}}>
            <Card.Link href={"/books/" + item.book._id}>{item.book.name}</Card.Link>
          </Row>
         
          <Row style={{justifyContent:'center'}}>
          <ReactStars
           
            count={5}
            value={item.book.totalRatingValue / item.book.totalRatingCount}
            size={24}
            edit={false}
            color2={'#ffd700'} />
            </Row>
        </Card.Body>

      </Card>
    })}
  </div>

  );
}
export default LoadBooks;