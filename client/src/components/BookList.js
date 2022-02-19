import {enableExperimentalFragmentVariables, gql,useQuery} from "@apollo/client";

const getBooksQuery = gql`
{
    books{
        id
        name
        genre
    }
}
`

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