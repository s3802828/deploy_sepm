import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedFunction } from '../../redux_sepm/actions/profile';
import { useParams } from 'react-router-dom';
import { functions } from '../../redux_sepm/reducers/function';
import UserSavedFunctions from './UserSavedFunction';
export default function PersonalCheatSheetTab() {

    const dispatch = useDispatch();
    const user_id = useParams();
    useEffect(() => {
        dispatch(getSavedFunction(user_id.user_id));
    }, [dispatch])
    const userSavedFunctionsList = useSelector((state) => state.profileSavedFunction)


    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div class="d-flex justify-content-center">
                        <div class="col-lg-10 col-12">
                            {userSavedFunctionsList?.map((element) => {
                                return <table class="table table-striped" style={{ border: "1px solid white" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col"><h3 class="text-center" style={{ color: "#ffc13b" }}>{element._id}</h3></th>
                                        </tr>
                                    </thead>

                                    {element.topics.map((func) => {
                                        return (
                                            <tbody style={{ borderTop: "1px solid white" }}>
                                                <tr>
                                                    <th scope="row">
                                                        <div class="d-flex">
                                                            <h5 class="ml-3 mt-2" style={{ color: "#ffc13b" }}>{func.category}</h5>
                                                        </div>
                                                    </th>
                                                </tr>
                                                {func.functions.map((detail) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">
                                                                <UserSavedFunctions func_detail={detail} user_id={user_id.user_id} />
                                                            </th>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        )
                                    })}
                                </table>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}