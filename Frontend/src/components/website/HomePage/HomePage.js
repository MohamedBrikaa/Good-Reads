import React from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoadBooks from '../LoadBooks/LoadBooks'
import { Row, Col, Container } from 'react-bootstrap'

function HomePage() {

  return (<div>
    <Row style={{ marginTop: '20px' }}>
      <Col>
        <h3 class="text-center" style={{ marginLeft: '150px' }}>Welcome to Good-Reads!</h3>

        {sessionStorage.getItem('userToken') == null &&
          <Col >
            <div className="d-flex justify-content-end card bg-dark mr-2 ml-5 text-center mt-2 mb-3" style={{ width: "700px", height: "450px" }}><RegisterForm /></div>
          </Col>
        }
      </Col>
      {sessionStorage.getItem('userToken') == null &&
        <div class="mt-5 mr-3" > <LoginForm /></div>
      }

    </Row>
   
    <Container>
     
      <Row className="justify-content-md-center">
     
        <Col sm={10}>
        
          <LoadBooks />
          
        </Col>

      </Row>
      
    </Container>
  </div>)
}
export default HomePage;