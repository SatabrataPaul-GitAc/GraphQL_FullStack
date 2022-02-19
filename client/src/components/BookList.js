import {gql,useQuery} from "@apollo/client";

const getBooksQuery = gql`
{
    books{
        name
        genre
    }
}
`

function BookList(){
    const{data} = useQuery(getBooksQuery);
    return (
        <div>
                <ul id="book-list">
                    <li>Book name</li>
                </ul>
            </div>
    )
}

export default BookList;