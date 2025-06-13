import React from 'react'
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { addNewBookApi } from './service/allApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Addnew() {
    const [show, setShow] = useState(false);
    const [bookDetails,setBookDetails]=useState({book:"",author:"",id:"",year:"",genre:""})
   
   
   
   
   
    const handleUpload=async()=>{
        const {book,author,id,year,genre}=bookDetails
        if(!book || !author ||!id ||!year ||!genre){
         toast.warning("please enter all values")
        }
        else{
            console.log("book details",bookDetails)
            const result=await addNewBookApi(bookDetails)
            console.log("result from backend",result)
            if(result.status===201){
             toast.success(result.data)
              handleClose()
              
            }
            else if(result.status===406){
             toast.warning("Book already exist! try to add a new Book")
            }
           else{
            alert("something went wrong")
           }
        }
     
    }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <>
  
     <div className='p-f d-flex justify-content-center align-items-center'>
    <button className='mt-4 btn btn-warning'onClick={handleShow}>UPLOAD NEW BOOK DETAILS</button>

   </div>
   
  


     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW BOOK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <input type="text"placeholder='BOOK TITLE' className='form-control mt-2' onChange={(e)=>setBookDetails({...bookDetails,book:e.target.value})}/>
                   <input type="text"placeholder='AUTHOR' className='form-control  mt-2' onChange={(e)=>setBookDetails({...bookDetails,author:e.target.value})} />
                      <input type="text"placeholder='BOOK ID' className='form-control  mt-2' onChange={(e)=>setBookDetails({...bookDetails,id:e.target.value})}/>
                         <input type="text"placeholder='YEAR OF PUBLISH' className='form-control  mt-2' onChange={(e)=>setBookDetails({...bookDetails,year:e.target.value})}/>
                            <input type="text"placeholder='GENRE'className='form-control  mt-2' onChange={(e)=>setBookDetails({...bookDetails,genre:e.target.value})} />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleUpload}>
           UPLOAD
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    
   </>
  )
}

export default Addnew
