import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
  return (
   <>
   <div style={{width:"100%",height:"10vh"}}>
      <Navbar className="bg-warning">
        <Container>
          <Navbar.Brand className='text-light'>  <i className="fa-solid fa-book-open fs-3 fa-fade"></i> MY BOOK COLLECTION</Navbar.Brand>
        </Container>
      </Navbar>
   </div>



  
   </>
  )
}

export default Header
