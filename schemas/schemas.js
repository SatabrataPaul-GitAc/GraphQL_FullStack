const graphql = require("graphql");
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLID = graphql.GraphQLID;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLSchema = graphql.GraphQLSchema;

//Dummy books data
var books_data = [
    {name: "Death on the Nile", genre: "Murder mystery", id: "1", author_id: "2"},
    {name: "Sherlock Holmes", genre: "Detective", id: "2", author_id: "3"},
    {name: "Northanger Abbey", genre: "Gothic Fiction", id: "3", author_id: "4"},
    {name: "War and Peace", genre: "War", id: "4", author_id: "5"},
    {name: "Anna Karenina", genre: "Fiction", id: "5", author_id: "5"},
    {name: "Hamlet, Prince of Denmark", genre: "Tragedy", id: "6", author_id: "6"},
    {name: "The Hero of the Ages", genre: "Fantasy", id: "8",author_id: "7"},
    {name: "The colour of magic", genre: "Fantasy", id: "9", author_id: "8"},
    {name: "The Light of Fantastic", genre: "Fantasy", id: "9", author_id: "8"}
    
]

//Dummy Authors data
var authors_data = [
    {name: "Paulo Coelho",id: "1",age: 56},
    {name: "Agatha Christie",id: "2",age: 45},
    {name: "Sir Arthur Canandoyle",id: "3",age: 84},
    {name: "Austen Jane",id: "4", age: 56},
    {name: "Tolstoy Leo",id: "5",age: 66},
    {name: "Wiiliam Shakespeare",id: "6",age: 100},
    {name: "Brandon Sanderson",id: "7",age: 55},
    {name: "Terry Pratchet",id: "8",age: 75}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                const authorDetails = authors_data.find((element)=>(
                    element.id==parent.author_id
                ))

                return authorDetails;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                const books_list = books_data.filter((element)=>(element.author_id==parent.id))

                return books_list;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //Code for finding the book with the passed id from the client
                const book_found = books_data.find((element)=>
                element.id==args.id)
                
                return book_found;
            }
        },

        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //Code for finding the author with the author id passed form the client
                const author_found = authors_data.find((element)=>
                element.id==args.id)
            
                return author_found;
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books_data;
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors_data;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});