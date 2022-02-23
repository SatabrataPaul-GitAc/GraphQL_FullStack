import {useQuery} from "@apollo/client";
import { useState } from "react";
import {getBooksQuery} from "../queries/queries";
import BookDetails from "./BookDetails";


function DisplayBooks(){
    const [selected,setState] = useState("");
    const {data,loading} = useQuery(getBooksQuery);

    if(loading===true) return <div>Loading Books ....</div>

    else if(loading===false){
        return (
            <div>
                {data.books.map((book)=>{
                    return <li className="books" key={book.id} onClick={(e)=>{
                        setState(book.id);
                    }}>{book.name}</li>
                })}
                <BookDetails bookid={selected}/>
            </div>
        )
    }
    
}



export {DisplayBooks};