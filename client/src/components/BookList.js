import {useQuery} from "@apollo/client";
import {getBooksQuery} from "../queries/queries";

function DisplayBooks(){
    const {data,loading} = useQuery(getBooksQuery);

    if(loading===true) return <div>Loading Books ....</div>

    else if(loading===false){
        return (
            data.books.map((book)=>{
                return <li key={book.id}>{book.name}</li>
            })
        )
    }
}

function BookList(){

    return (
        <div>
                <ul id="book-list">
                    {DisplayBooks()}
                </ul>
            </div>
    )
}

export default BookList;