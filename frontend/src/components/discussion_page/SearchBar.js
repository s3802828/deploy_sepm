import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchPostsByTopic, searchPostsByLanguage } from "../../redux_sepm/actions/post"

export default function SearchBar({ category_id, language_id }) {
    const searchResult = useSelector((state) => state.searchReducer)

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const searching = (keyword) => {
        if (category_id == 'general' || category_id == 'popular') {
            dispatch(searchPostsByLanguage(language_id, keyword))
        } else {
            dispatch(searchPostsByTopic(category_id, keyword))
        }
    }
    useEffect(() => {
        if (searchResult) {
            document.getElementById("searchResultButton").click();
            console.log(searchResult)
        }
    }, [searchResult])
    return (
        <>
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); searching(search) }}>
                <input class="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button class="btn btn-outline-dark" style={{ display: "none" }} type="submit">Search</button> */}
            </form>

            <button type="button" id="searchResultButton" style={{ display: "none" }} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchResultModal"></button>

            <div class="modal fade" id="searchResultModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Result</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Post</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResult && searchResult.map((element, index) => <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td><a href={`/postdetail/${element._id}`} style={{textDecoration: "none", color:"black"}}>
                                            <strong>{element.title}</strong><br />{element.content.length > 200
                                                ? element.content.substring(0, 199) + '......'
                                                : element.content}
                                        </a></td>
                                    </tr>)}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}