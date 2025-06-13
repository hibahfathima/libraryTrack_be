import React, { useEffect, useState } from 'react';
import { deleteBookApi, getBookApi, updateBookApi } from './service/allApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import Addnew from './Addnew';

function BookList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  const handleShow = (items) => {
    setShow(true);
    setEditBook({
      book: items.book,
      author: items.author,
      id: items.id,
      year: items.year,
      genre: items.genre,
      mongoId: items._id
    });
  };

  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState({
    book: "",
    author: "",
    id: "",
    year: "",
    genre: "",
    mongoId: ""
  });
  const [searchTerm,setSearchTerm]=useState('')

  const getBook = async () => {
    const result = await getBookApi();
    setBooks(result.data);
  };

  useEffect(() => {
    getBook();
  }, [books]);

  const handleUpdate = async () => {
    const { book, author, id, year, genre, mongoId } = editBook;
    if (!book || !author || !id || !year || !genre) {
      toast.warning("Enter all values");
    } else {
      const result = await updateBookApi(mongoId, editBook);
      if (result.status === 200) {
        toast.success("Book updated successfully");
        handleClose();
        getBook(); // refresh list after update
      } else {
        toast.error("Update failed");
      }
    }
  };

  const handleDelete = async (mongoId) => {
    const result = await deleteBookApi(mongoId);
    if (result.status === 200) {
      toast.success("Book deleted");
      getBook(); // refresh list after delete
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="min-vh-100 bg-light py-4">
        <div className="container-fluid">
          <h3 className="text-center text-warning mb-4">MY CURRENT BOOKS</h3>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10">
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-bordered text-center align-middle mb-0">
                  <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                      <th>BOOK TITLE</th>
                      <th>AUTHOR</th>
                      <th>BOOK ID</th>
                      <th>YEAR OF PUBLISH</th>
                      <th>GENRE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books
  ?.filter((item) =>
    item.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )
                    
                    
                   .map((items, index) => (
                      <tr key={index}>
                        <td>{items.book}</td>
                        <td>{items.author}</td>
                        <td>{items.id}</td>
                        <td>{items.year}</td>
                        <td>{items.genre}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-3">
                            <button
                              className="btn btn-sm btn-outline-success"
                              style={{ border: 'none' }}
                              onClick={() => handleShow(items)}
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              style={{ border: 'none' }}
                              onClick={() => handleDelete(items._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-around mt-4'>
            <Addnew />
            <input type="text" placeholder="Search book by name" className='form-control h-50 w-25 mt-2'
            onChange={(e)=>setSearchTerm(e.target.value)}/>
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" placeholder='BOOK TITLE' className='form-control mt-2' value={editBook.book}
              onChange={(e) => setEditBook({ ...editBook, book: e.target.value })} />
            <input type="text" placeholder='AUTHOR' className='form-control mt-2' value={editBook.author}
              onChange={(e) => setEditBook({ ...editBook, author: e.target.value })} />
            <input type="text" placeholder='BOOK ID' className='form-control mt-2' value={editBook.id}
              onChange={(e) => setEditBook({ ...editBook, id: e.target.value })} />
            <input type="text" placeholder='YEAR OF PUBLISH' className='form-control mt-2' value={editBook.year}
              onChange={(e) => setEditBook({ ...editBook, year: e.target.value })} />
            <input type="text" placeholder='GENRE' className='form-control mt-2' value={editBook.genre}
              onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>Close</Button>
          <Button variant="success" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default BookList;
