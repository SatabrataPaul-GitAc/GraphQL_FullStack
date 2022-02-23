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
                    <p>BookName : {data.book.name}</p>
                    <p>Genre: {data.book.genre}</p>
                    <p>Author: {data.book.author.name}</p>
                </div>
            )
        }
        else{
            return null
        }
    }
}

export default BookDetails;