import weblogo from "../../assets/weblogo.jpg"

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLanguage, getTopicFromLang } from "../../redux_sepm/actions/language";

import Post from "./Post";
import Sidebar from "./Sidebar";
import AddPost from "../forms/AddPost";
import SearchBar from "./SearchBar";
import { getGeneralPosts, getPopularPosts, getPostFromTopic } from "../../redux_sepm/actions/post";

export default function DiscussionPage() {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);

    const topicList = useSelector((state) => state?.categories)
    const postList = useSelector((state) => state?.posts)
    const languageList = useSelector((state) => state?.languages)
    const { authData } = useSelector((state) => state?.authReducer)
    const { language_id, topic_id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLanguage())
        dispatch(getTopicFromLang(language_id))
        if (topic_id == 'general') {
            dispatch(getGeneralPosts(language_id))
        } else if (topic_id == 'popular') {
            dispatch(getPopularPosts(language_id))
        } else {
            dispatch(getPostFromTopic(topic_id))
        }
    }, [])

    return (
        <div style={{ marginTop: 60, marginBottom: 80 }}>
            <div className="container" >
                <div class="row my-3 border p-1 border-1 border-dark rounded" style={{ backgroundColor: '#fda47e' }}>
                    <div className="col-2" style={{ width: "10%", height: "10%" }}><img className="img-fluid" src={weblogo} /></div>
                    <div className="col-10 d-flex justify-content-center align-items-center">
                        <h2 style={{ textTransform: "uppercase" }}>{languageList.map((element) => element._id === language_id && element.name)}</h2>
                    </div>

                </div>
                <div className="row my-3 d-flex justify-content-between">
                    <div class="col-2">
                        <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-filter" />Language
                        </button>
                        <ul class="dropdown-menu">
                            {languageList.map((element) => <li><a class="dropdown-item" href={`/client/discussion/${element._id}/general`}>{element.name}</a></li>)}
                        </ul>
                    </div>

                    <div className="col-8"><SearchBar category_id={topic_id} language_id={language_id} /></div>
                    <div className="col-2 d-flex justify-content-end">
                        {authData && (showCreatePostForm ? <button class="btn" type="button"
                            onClick={() => setShowCreatePostForm(false)}><i class="bi bi-dash-circle ms-auto"></i>CLOSE FORM</button> :
                            <button class="btn" type="button"
                                onClick={() => setShowCreatePostForm(true)}><i class="bi bi-plus-circle ms-auto"></i>NEW QUESTION</button>)}
                    </div>
                </div>
                <div class='container'>
                    <div class='row'>
                        <div class='col-3 ms-2'>
                            <div className="row d-flex">
                                <Sidebar topicList={topicList} language_id={language_id} topic_id={topic_id} />
                            </div>

                        </div>
                        <div class='col-7'>
                            <div className="row">
                                {showCreatePostForm && <AddPost lang={languageList} topic_id={topic_id} language_id={language_id} />}
                                {postList.map((element) => {
                                    return (
                                        <div>
                                            <Post post={element} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}