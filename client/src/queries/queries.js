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

export {getBooksQuery,getAuthorsQuery};