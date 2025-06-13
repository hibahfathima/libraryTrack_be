
import { baseUrl } from "./baseUrl"
import { comonApi } from "./comonApi"

export const addNewBookApi=async(bookDetails)=>{
    return await comonApi("POST",`${baseUrl}/addNewBook`,bookDetails,"")
}

export const getBookApi=async()=>{
    return await comonApi("GET",`${baseUrl}/getBook`,"","")
}


export const updateBookApi=async(mongoId,editBook)=>{
      return await comonApi("PUT",`${baseUrl}/editBook/${mongoId}`,editBook,"")
}

export const deleteBookApi=async(mongoId)=>{
      return await comonApi("DELETE",`${baseUrl}/deleteBook/${mongoId}`,{},"")
}