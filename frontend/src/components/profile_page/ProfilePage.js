import UserPost from './UserPost';
import PersonalInfo from './PersonalInfo';
import { useSelector, useDispatch } from 'react-redux';
import './../../App.css';
import PersonalCheatSheetTab from './PersonalCheatSheetTab';
import { useEffect } from 'react';
import { getOwnedPosts, getSavedFunction, fetchUser } from '../../redux_sepm/actions/profile';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
    
    
    const dispatch = useDispatch();
    

    const user_id = useParams();


    useEffect(() => {
        dispatch(fetchUser(user_id.user_id))
        dispatch(getOwnedPosts(user_id.user_id));
    }, [dispatch])


    const userPostList = useSelector((state) => state.profileOwnedPost)
    const userInfo = useSelector((state) => state.profile)

    
    return (
        <div style={{ marginTop: 80, marginBottom: 80 }}>

            <div className="container my-5">

                <PersonalInfo userInfo = { userInfo }/>


                <div className="row">

                    <ul class="nav nav-tabs nav-pills with-arrow lined flex-sm-row text-center mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 border active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Cheat Sheet</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link text-uppercase font-weight-bold rounded-0 border" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Posts</a>
                        </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <PersonalCheatSheetTab />
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">


                            {userPostList && userPostList?.map((element) => {
                                return (
                                    <div>
                                        <UserPost post={element} userInfo={userInfo}/>
                                    </div>
                                )
                            })}


                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}