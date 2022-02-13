const graphql = require("graphql");
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLID = graphql.GraphQLID;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLSchema = graphql.GraphQLSchema;

//Importing mongoose models 
const bookModel = require("../models/booksModel");
const authorModel = require("../models/authorsModel");



const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                const authorDetails = authorModel.findById(parent.author_id);
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
                const books_list = bookModel.find({author_id: parent.id});

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
                const book_found = bookModel.findById(args.id);
                return book_found;
            }
        },

        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //Code for finding the author with the author id passed form the client
                const author_found = authorModel.findById(args.id);
                return author_found;
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return bookModel.find();
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authorModel.find();
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent,args){
                const newAuthor = new authorModel({
                    name: args.name,
                    age: args.age
                });

                return newAuthor.save();
            }
        },

        addBook: {
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                author_id: {type: GraphQLID}
            },
            resolve(parent,args){
                const newBook = new bookModel({
                    name: args.name,
                    genre: args.genre,
                    author_id: args.author_id
                });

                return newBook.save();
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});