import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchFunction } from "../../redux_sepm/actions/language.js"

export default function Search({ language_id }) {

    const searchResult = useSelector((state) => state.searchReducer)

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getLanguage());
    // }, [])

    // const languages = useSelector((state) => state.languages);
    const searching = (keyword) => {
        console.log("helllooooooo")
        dispatch(searchFunction(language_id.language_id, keyword))
    }
    useEffect(() => {
        if (searchResult) {
            document.getElementById("searchResultButton").click();
            console.log(searchResult)
        }
    }, [searchResult])

    return (
        <>
            <div>
                <form class="d-flex" onSubmit={(e) => { e.preventDefault(); searching(search) }}>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {/* <button class="btn btn-outline-dark" type="submit" style={{ display: "none" }} >Search</button> */}
                </form>
            </div>

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
                                        <th scope="col">Topics</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResult && searchResult.topics.map((element, index) => <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td><a href={`/client/cheatsheet/${language_id.language_id}#topic-${element._id}`} style={{ textDecoration: "none", color: "black" }}>
                                            {element.name}
                                        </a></td>
                                    </tr>)}
                                </tbody>
                            </table>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Functions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResult && searchResult.functions.map((element, index) => <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td><a href={`/client/cheatsheet/${language_id.language_id}#${element._id}`} style={{textDecoration: "none", color:"black"}}>
                                            {element.name}
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