import React from 'react'
import Header from './components/Header'
import BookList from './components/BookList'
import { Route, Routes } from 'react-router-dom'
import Addnew from './components/Addnew'
import Footer from './components/Footer'
import Screen from './components/Screen'

function App() {
  return (
    <div>
      <Header/>
  
<Screen/>
    <BookList/>
    
  
  
  <Footer/>
    </div>
  )
}

export default App
