import { useQuery } from "@apollo/client";
import { useReducer} from "react";
import { getAuthorsQuery } from "../queries/queries";

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

function submitForm(e){
    e.preventDefault();
    console.log(initialstate);
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

    return (
        <form id="add-book" onSubmit={(e)=>submitForm(e)}>
            <div className="field">
                <label>BookName : </label>
                <input type="text" onChange={(e)=>{dispatch(bookName(e))}}></input>
            </div>

            <div className="field">
                <label>Genre : </label>
                <input type="text" onChange={(e)=>{dispatch(genre(e))}}/>
            </div>

            <div className="field">
                <label>Author : </label>
                <select onChange={(e)=>{dispatch(authorid(e))}}>
                    <option>Select Author</option>
                    {GetAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook;