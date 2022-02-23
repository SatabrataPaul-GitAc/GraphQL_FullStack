import { useQuery,useMutation } from "@apollo/client";
import { useReducer} from "react";
import { getAuthorsQuery,addBookMutation,getBooksQuery } from "../queries/queries";


const initialstate = {
    name: "",
    genre: "",
    authorid: ""
}

const reducer = (state,action)=>{
    switch(action.type){
        case "bookname":
            state.name=action.bookname;
            return state;
        case "genre":
            state.genre=action.genre;
            return state;
        case "authorid":
            state.authorid=action.authorid;
            return state;
        default:
            throw new Error();    
    }
}

const bookName = (e) =>{
    return (
        {type: "bookname",bookname: e.target.value}
    )
}

const genre = (e)=>{
    return (
        {type: "genre",genre: e.target.value}
    )
}

const authorid = (e)=>{
    return (
        {type: "authorid",authorid: e.target.value}
    )
}


function GetAuthors(){
    const {data,loading} = useQuery(getAuthorsQuery);

    if(loading===true) return <option>Loading authors ...</option>

    else if(loading===false){
        return (
            data.authors.map((author)=>{
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        )
    }
}


function AddBook(){

    const [state,dispatch] = useReducer(reducer, initialstate);
    const [addBook,{data,loading}] = useMutation(addBookMutation);

    
    return (
        <form id="add-book" onSubmit={(e)=>{
            e.preventDefault();
            console.log(initialstate);
            addBook({
                variables: {
                    name: initialstate.name,
                    genre: initialstate.genre,
                    author_id: initialstate.authorid
                },
                refetchQueries: [getBooksQuery]
            }).then((result)=>{
                console.log("Book Added Successfully...")
            })
        }}>
            <div className="field">
                <label><b>BookName : </b></label>
                <input type="text" onChange={(e)=>{dispatch(bookName(e))}}></input>
            </div>

            <div className="field">
                <label><b>Genre : </b></label>
                <input type="text" onChange={(e)=>{dispatch(genre(e))}}/>
            </div>

            <div className="field">
                <label><b>Author : </b></label>
                <select onChange={(e)=>{dispatch(authorid(e))}}>
                    <option>Select Author</option>
                    {GetAuthors()}
                </select>
            </div>

            <button type="submit">+</button>
        </form>
    )
}

export default AddBook;