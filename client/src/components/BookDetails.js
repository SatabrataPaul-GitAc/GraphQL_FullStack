import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(props){
    const {data,loading} = useQuery(getBookQuery,{
        variables: {
            id: props.bookid
        }
    });

    if(loading===true) return <p>Loading Book Details...</p>
    else if(loading===false){
        if(data!==undefined){
            return (
                <div>
                    <h2>BookName : {data.book.name}</h2>
                    <p>Genre: {data.book.genre}</p>
                    <p>Author: {data.book.author.name}</p>
                    <p>All Books by this Author: </p>
                    <ul className="other-books">
                        {data.book.author.books.map((item)=>{
                            return (
                                <li key={item.id}>{item.name}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return <p>No Book Selected...</p>
        }
    }
}

export default BookDetails;