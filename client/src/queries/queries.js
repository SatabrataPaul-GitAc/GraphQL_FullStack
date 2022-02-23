import {gql} from "@apollo/client";

const getBooksQuery = gql`
{
    books{
        id
        name
        genre
    }
}
`

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`


const getBookQuery = gql`
query($id: ID!){
    book(id: $id){
        id
        name
        genre
        author{
            name
            age
            books{
                name
                id
            }
        }
    }
}`




const addBookMutation = gql`
mutation($name: String!,$genre: String!,$author_id: ID!){
    addBook(name:$name, genre:$genre, author_id:$author_id){
        name
        id
    }
}`

export {getBooksQuery,getAuthorsQuery,getBookQuery,addBookMutation};