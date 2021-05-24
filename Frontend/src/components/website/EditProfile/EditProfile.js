import React ,{ useState, useEffect }from 'react';
import { Form , Button , Row } from 'react-bootstrap'
import axios from 'axios';

function EditForm() {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword]= useState("");
  const [cpasswordValue, setcPassword]= useState("");
  const [firstNameValue, setfirstName] = useState("");
  const [lastNameValue, setlastName]= useState("");
  const token = sessionStorage.getItem('userToken')
  
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(passwordValue.lengh && passwordValue != cpasswordValue) alert("Passwords don't match..")
    else {
    axios.post('http://localhost:5000/users/editUser/'+token ,{"firstName":firstNameValue,"lastName":lastNameValue,"email":emailValue,"password":passwordValue} )
    .then(res => {
      console.log("da l res",res);
      alert("Your edits are saved suuccessfully") 
      setEmail(res.data.email)
      setPassword('')
      setcPassword('')
      setfirstName(res.data.firstName)
      setlastName(res.data.lastName)
    })
    .catch(function(error){
      alert("This email already exists ")
    })
  }
  
}
 const getUserInfo = ()=>{

    axios.get('http://localhost:5000/users/getUser/'+token)
    .then(res => {

        setEmail(res.data.email)
        setfirstName(res.data.firstName)
        setlastName(res.data.lastName)
    })
 } 
 useEffect(()=>{ 
    getUserInfo()
}, []);

  return (<div style={{width:'350px', margin:'auto', marginTop:'60px'}}><Form   onSubmit={handleSubmit} >
   <h3>Edit your Profile Details</h3>
    
     <Form.Group as={Row} controlId="validationCustom01">
            <Form.Control  type="text"   style={{  marginLeft : '10px',width:'350px' }}  value={firstNameValue} onChange={e => setfirstName(e.target.value)} placeholder="First Name"/>
    </Form.Group>
     
    <Form.Group  as={Row}  controlId="validationCustom02">
             <Form.Control  type="text"  style={{  marginLeft : '10px',width:'350px' }} value={lastNameValue} onChange={e => setlastName(e.target.value)} placeholder="Last Name"/>
    </Form.Group>
    
    <Form.Group as={Row} controlId="formPlaintextEmail">
           <Form.Control  type="email"  style={{  marginLeft : '10px',width:'350px' }}  value={emailValue} onChange={e => setEmail(e.target.value)} placeholder="Email Address"/>   
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Password"  style={{  marginLeft : '10px',width:'350px' }} value={passwordValue} onChange={e => setPassword(e.target.value)}/>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Confirm Password"  style={{  marginLeft : '10px',width:'350px' }} className="justify-content-md-center"  value={cpasswordValue} onChange={e => setcPassword(e.target.value)}/>
  </Form.Group>



<Button type="submit" className="btn btn-warning" style={{marginLeft:'100px'}} >Save Changes</Button>
</Form></div>);
}
export default EditForm;
