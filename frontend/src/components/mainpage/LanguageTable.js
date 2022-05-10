import FunctionDropdown from "./FunctionDropdown";
import { useEffect } from "react";
import { useParams } from 'react-router';

import { useDispatch, useSelector } from "react-redux";
import { getTopicFromLang, getFunctionFromTopic } from '../../redux_sepm/actions/language';


export default function LanguageTable({ languages }) {

    const topic_id = useParams();

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (topic_id != undefined) {
            dispatch(getTopicFromLang(topic_id.language_id));
            dispatch(getFunctionFromTopic(topic_id.language_id));
        }

    }, [dispatch])


    const topicList = useSelector((state) => state.categories);

    const func_list = useSelector((state) => state.functions);
    const { authData, role } = useSelector((state) => state.authReducer)

    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr class="row">
                        <div className="d-flex">
                            <div className="">
                                {languages.filter(lang => lang._id == topic_id.language_id).map(lang => {
                                    return (
                                        <th scope="col">
                                            <h3 class="ml-3 mt-2">{lang.name}</h3>
                                        </th>
                                    )
                                })}
                            </div>
                            {role && role.includes('admin') &&<div class="ms-auto me-2">
                                <a class="btn mx-3" href={`/client/addfunction/${topic_id.language_id}`}><i class="bi bi-plus-circle"> <strong>Add New Function</strong></i></a>
                            </div> }
                        </div>
                    </tr>
                </thead>
                {topicList.map((element) => {
                    return (
                        <tbody class="mb-2">
                            <tr>
                                <th scope="row" id = {`topic-${element._id}`}>
                                    <div class="d-flex">
                                        <h5 class="ml-3 mt-2">{element.name}</h5>
                                        <span class="ms-auto">
                                            <a class="btn mx-3" href={`/client/discussion/${topic_id.language_id}/${element._id}`}><i class="bi bi-link-45deg"> <strong><u>Discussion</u></strong></i></a>
                                        </span>
                                    </div>
                                </th>
                            </tr>
                            {func_list.filter(func => func.category_id == element._id).map(func => {
                                return (<tr>
                                    <th scope="row">
                                        <FunctionDropdown func={func} category_id={element} />
                                    </th>
                                </tr>
                                )
                            })}

                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}