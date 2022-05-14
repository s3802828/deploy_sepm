import LanguageTable from "./LanguageTable"
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLanguage } from "../../redux_sepm/actions/language"
import Search from "./Search";

export default function MainPage() {

    const language_id = useParams();
    const topic_id = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguage());
    }, [])


    const languages = useSelector((state) => state.languages);
    console.log(languages)

    return (
        <>
            <div>
                <div className="container" style={{ marginTop: 80, marginBottom: 80 }}>

                    <div class="d-flex bd-highlight my-3">

                        <div class="bd-highlight container" >
                            <div className="row">
                                <div className="col-11"><Search language_id={language_id} /></div>
                                <div class="dropdown col-1">
                                    <div class="btn-group">

                                        <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#ffc13b" }}>
                                            <i class="bi bi-filter" />Language
                                        </button>

                                        <ul class="dropdown-menu">

                                            {languages.length == 0 ? <li>No languages</li> : languages.map((element) =>
                                                <li><a class="dropdown-item" href={`/client/cheatsheet/${element._id}`}>{element.name}</a></li>
                                            )}

                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div className="col-lg-2"></div>
                        <div class="col-lg-8 col-12"><LanguageTable languages={languages} /></div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
}