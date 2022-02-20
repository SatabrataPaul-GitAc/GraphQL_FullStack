import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";


function GetAuthors(){
    const {data,loading} = useQuery(getAuthorsQuery);

    if(loading===true) return <option>Loading Authors ...</option>

    else if(loading===false){
        return (
            data.authors.map((author)=>{
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        )
    }
}


function AddBook(){
    return (
        <form id="add-book">
            <div className="field">
                <label>BookName : </label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre : </label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author : </label>
                <select>
                    <option>{GetAuthors()}</option>
                </select>
            </div>
        </form>
    )
}

export default AddBook;