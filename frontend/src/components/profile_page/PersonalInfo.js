import { EditAvatar, EditProfile } from "../forms/EditProfile"

import React from 'react';
import { useSelector } from 'react-redux';

import { nl2br } from '../../utils/index'

export default function PersonalInfo({ userInfo }) {
    const userIdParams = userInfo._id
    console.log(userIdParams)
    const { authData } = useSelector((state) => state.authReducer)
    console.log(authData)

    const user_id = authData?._id
    return (
        <div className="row my-5">
            <div className="col-sm-12 col-md-4 col-lg-4">

                <img src={`${userInfo.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${userInfo.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `} width="200" height="200" class="rounded-circle border border-warning mx-auto my-auto d-block" alt="Profile Image" />

            </div>

            <div className="col-sm-12 col-md-8 col-lg-8">
                <div class="d-flex">
                    <h4 style={{ color: "#ffc13b" }}>{userInfo?.name}&nbsp;({userInfo?.username})</h4>
                    {/* <h4>{authData?.name}&nbsp;({authData?.username})</h4> */}
                    {authData?._id == userIdParams &&
                        <div class="btn-group ms-auto">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-gear"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Edit Personal Information
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editAvaModal">
                                        Edit Avatar
                                    </a>
                                </li>
                                <li><a class="dropdown-item" href="/client/passwordchange">Change Password</a></li>
                            </ul>

                            <EditProfile />
                            <EditAvatar />

                        </div>}

                </div>

                <div class="d-flex flex-row" style={{ color: "#ffc13b" }}>
                    <h6>Email:</h6>
                    <p class="mx-2" >{userInfo?.email}</p>
                </div>
                <h6 style={{ color: "#ffc13b" }}>Bio</h6>
                <div className="overflow-auto" style={{ height: "100px", color: "#ffc13b" }}>{userInfo?.bio && nl2br(userInfo?.bio)}</div>
                <div class="d-flex" style={{ color: "#ffc13b" }}>
                    <h6 class="me-3">Contact:</h6>
                    {userInfo?.contacts?.facebook && userInfo?.contacts?.facebook != '' &&
                        <a href={userInfo?.contacts?.facebook.startsWith("http") ? `${userInfo?.contacts?.facebook}` : `https://${userInfo?.contacts?.facebook}`} target="_blank">
                            <h4>
                                <i style={{ color: "#ffc13b" }} class="bi bi-facebook mx-1"></i>
                            </h4>
                        </a>}
                    {userInfo?.contacts?.instagram && userInfo?.contacts?.instagram != '' &&
                        <a href={userInfo?.contacts?.instagram.startsWith("http") ? `${userInfo?.contacts?.instagram}` : `https://${userInfo?.contacts?.instagram}`} target="_blank">
                            <h4>
                                <i style={{ color: "#ffc13b" }} class="bi bi-instagram mx-1"></i>
                            </h4>
                        </a>}
                    {userInfo?.contacts?.twitter && userInfo?.contacts?.twitter != '' &&
                        <a href={userInfo?.contacts?.twitter.startsWith("http") ? `${userInfo?.contacts?.twitter}` : `https://${userInfo?.contacts?.twitter}`} target="_blank">
                            <h4>
                                <i style={{ color: "#ffc13b" }} class="bi bi-twitter mx-1"></i>
                            </h4>
                        </a>}
                    {userInfo?.contacts?.linkedin && userInfo?.contacts?.linkedin != '' &&
                        <a href={userInfo?.contacts?.linkedin.startsWith("http") ? `${userInfo?.contacts?.linkedin}` : `https://${userInfo?.contacts?.linkedin}`} target="_blank">
                            <h4>
                                <i style={{ color: "#ffc13b" }} class="bi bi-linkedin mx-1"></i>
                            </h4>
                        </a>}
                    {userInfo?.contacts?.github && userInfo?.contacts?.github != '' &&
                        <a href={userInfo?.contacts?.github.startsWith("http") ? `${userInfo?.contacts?.github}` : `https://${userInfo?.contacts?.github}`} target="_blank">
                            <h4>
                                <i style={{ color: "#ffc13b" }} class="bi bi-github mx-1"></i>
                            </h4>
                        </a>}
                </div>


            </div>

        </div>
    )
}