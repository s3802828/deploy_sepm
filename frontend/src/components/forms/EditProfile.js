import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateProfile, updateAva } from '../../redux_sepm/actions/profile'

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export function EditProfile() {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Name is required')
            .max(50, 'Name must not exceed 50 characters')
            .matches(
                /^(?!'-_[ ]+$)[a-zA-Z .]*$/,
                'Name must only contain letters and space'
            ),
        username: Yup.string()
            .trim()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(15, 'Username must not exceed 15 characters')
            .matches(
                /^[a-zA-Z0-9_]+$/,
                'Username must only contain letters, numbers, or "_"'
            ),
        email: Yup.string()
            .trim()
            .required('Email is required')
            .email('Email is invalid'),
        bio: Yup.string().trim()
            .max(1000, "Bio cannot excess 1000 characters")
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        facebook: Yup.string().trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        instagram: Yup.string().trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        twitter: Yup.string().trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        linkedin: Yup.string().trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        github: Yup.string().trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v)
    })

    const {
        register,
        unregister,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        shouldUnregister: true,
        mode: 'onSubmit'
    });

    const { authData } = useSelector((state) => state.authReducer)

    const [profileData, setProfileData] = useState({
        _id: authData?._id,
        username: authData?.username,
        name: authData?.name,
        email: authData?.email,
        bio: authData?.bio,
        contacts: authData?.contacts
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (authData) {
            setProfileData({
                _id: authData?._id,
                username: authData?.username,
                name: authData?.name,
                email: authData?.email,
                bio: authData?.bio,
                contacts: authData?.contacts
            })
        }
    }, [authData])

    const update = (e) => {
        // e.preventDefault();
        console.log(profileData)
        dispatch(updateProfile(profileData))
        window.location.replace(`/client/profile/${authData?._id}`)
    }

    return (
        <div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Personal Information</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">

                                <div class="col-12">

                                    <form class="row" onSubmit={handleSubmit(update)}>
                                        <div class="mx-1">
                                            <h6>Username</h6>
                                            <div className='mb-3'>
                                                <input type="text" name="username" value={profileData.username} aria-label="username" aria-describedby="basic-addon1"
                                                    className={`form-control ${errors.username
                                                        ? 'is-invalid'
                                                        : ''}`} {...register('username')}
                                                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}></input>
                                                <div className='invalid-feedback'>
                                                    {errors.username?.message}
                                                </div>
                                            </div>
                                            <h6>Name</h6>
                                            <div className='mb-3'>
                                                <input type="text" name="name" value={profileData.name} aria-label="name" aria-describedby="basic-addon1"
                                                    className={`form-control ${errors.name
                                                        ? 'is-invalid'
                                                        : ''}`} {...register('name')}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}></input>
                                                <div className='invalid-feedback'>
                                                    {errors.name?.message}
                                                </div>
                                            </div>
                                            <h6>Email</h6>
                                            <div className='mb-3'>
                                                <input type="text" name="email" value={profileData.email} aria-label="email" aria-describedby="basic-addon1"
                                                    className={`form-control ${errors.email
                                                        ? 'is-invalid'
                                                        : ''}`} {...register('email')}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}></input>
                                                <div className='invalid-feedback'>
                                                    {errors.email?.message}
                                                </div>
                                            </div>
                                            <h6>Bio</h6>
                                            <textarea name="bio" value={profileData.bio} id="bio" rows="2"
                                                className={`form-control mb-3 ${errors.bio
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('bio')}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.bio?.message}
                                            </div>
                                            <h6>Contact</h6>
                                            <div class="form-group d-flex">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Facebook%2BIcon%2BBlack.png" class="rounded-circle  mx-1 my-1" style={{ width: "20px", height: "20px" }}></img>
                                                <div className='form-group mb-3' style={{ flex: "1 1 auto" }}>
                                                    <input type="text" name='facebook' placeholder="link" aria-label="NewFunction" aria-describedby="basic-addon1" value={profileData?.contacts?.facebook}
                                                        className={`form-control w-100 ${errors.facebook
                                                            ? 'is-invalid'
                                                            : ''}`} {...register('facebook')}
                                                        onChange={(e) => setProfileData({ ...profileData, contacts: { ...profileData.contacts, facebook: e.target.value } })}></input>
                                                    <div className='invalid-feedback'>
                                                        {errors.facebook?.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex">
                                                <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" class="rounded-circle  mx-1 my-1" style={{ width: "20px", height: "20px" }}></img>
                                                <div className='form-group mb-3' style={{ flex: "1 1 auto" }}>
                                                    <input type="text" name='instagram' placeholder="link" aria-label="NewFunction" aria-describedby="basic-addon1" value={profileData?.contacts?.instagram}
                                                        className={`form-control w-100 ${errors.instagram
                                                            ? 'is-invalid'
                                                            : ''}`} {...register('instagram')}
                                                        onChange={(e) => setProfileData({ ...profileData, contacts: { ...profileData.contacts, instagram: e.target.value } })}></input>
                                                    <div className='invalid-feedback'>
                                                        {errors.instagram?.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex">
                                                <img src="https://uploads-ssl.webflow.com/604f62b336573137786d8b67/6069a6cb43ba4018a72d9acb_twitter.png" class="rounded-circle  mx-1 my-1" style={{ width: "20px", height: "20px" }}></img>
                                                <div className='form-group mb-3' style={{ flex: "1 1 auto" }}>
                                                    <input type="text" name='twitter' placeholder="link" aria-label="NewFunction" aria-describedby="basic-addon1" value={profileData?.contacts?.twitter}
                                                        className={`form-control w-100 ${errors.twitter
                                                            ? 'is-invalid'
                                                            : ''}`} {...register('twitter')}
                                                        onChange={(e) => setProfileData({ ...profileData, contacts: { ...profileData.contacts, twitter: e.target.value } })}></input>
                                                    <div className='invalid-feedback'>
                                                        {errors.twitter?.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex">
                                                <img src="https://cdn.icon-icons.com/icons2/2428/PNG/512/linkedin_black_logo_icon_147114.png" class="rounded-circle mx-1 my-1" style={{ width: "20px", height: "20px" }}></img>
                                                <div className='form-group mb-3' style={{ flex: "1 1 auto" }}>
                                                    <input type="text" name='linkedin' placeholder="link" aria-label="NewFunction" aria-describedby="basic-addon1" value={profileData?.contacts?.linkedin}
                                                        className={`form-control w-100 ${errors.linkedin
                                                            ? 'is-invalid'
                                                            : ''}`} {...register('linkedin')}
                                                        onChange={(e) => setProfileData({ ...profileData, contacts: { ...profileData.contacts, linkedin: e.target.value } })}></input>
                                                    <div className='invalid-feedback'>
                                                        {errors.linkedin?.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex">
                                                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png?w=360" class="rounded-circle  mx-1 my-1" style={{ width: "20px", height: "20px" }}></img>
                                                <div className='form-group mb-3' style={{ flex: "1 1 auto" }}>
                                                    <input type="text" name='github' placeholder="link" aria-label="NewFunction" aria-describedby="basic-addon1" value={profileData?.contacts?.github}
                                                        className={`form-control w-100 ${errors.github
                                                            ? 'is-invalid'
                                                            : ''}`} {...register('github')}
                                                        onChange={(e) => setProfileData({ ...profileData, contacts: { ...profileData.contacts, github: e.target.value } })}></input>
                                                    <div className='invalid-feedback'>
                                                        {errors.github?.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-primary"
                                                onClick={() => {
                                                    unregister('username', { keepDefaultValue: true, });
                                                    unregister('name', { keepDefaultValue: true, });
                                                    unregister('email', { keepDefaultValue: true, });
                                                    unregister('bio', { keepDefaultValue: true, });
                                                    unregister('facebook', { keepDefaultValue: true, });
                                                    unregister('instagram', { keepDefaultValue: true, });
                                                    unregister('twitter', { keepDefaultValue: true, });
                                                    unregister('linkedin', { keepDefaultValue: true, });
                                                    unregister('github', { keepDefaultValue: true, });
                                                }}
                                            >Save</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export function EditAvatar() {

    const [ava, setAva] = useState(null);
    const { authData } = useSelector((state) => state.authReducer)

    console.log(authData);

    const validationSchema = Yup.object().shape({
        avatar: Yup.mixed()
            .required('Image file is required')
            .test('fileSize', 'The file is too large. Maximum size is 8MB', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return value[0].size <= 8000000;
            })
            .test('fileType', 'Only jpeg/png file is accepted', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return (
                    value[0].type === 'image/jpeg' ||
                    value[0].type === 'image/png'
                );
            }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const dispatch = useDispatch();

    const submitAva = (form, e) => {

        e.preventDefault();

        const dataArray = new FormData();

        if (ava != null) {
            dataArray.append("avatar", ava);
        }

        dispatch(updateAva(authData._id, dataArray));

        console.log(ava, authData._id);
        window.location.replace(`/client/profile/${authData._id}`)
    }

    function showPreview(event) {
        if (event.target.files.length > 0) {
            if (event.target.files[0].type.split("/")[0] == "image") {
                // console.log(event.target.files[0].type.split("/")[0]);
                var src = URL.createObjectURL(event.target.files[0]);
                var preview = document.getElementById("ava-preview");
                preview.src = src;
                preview.style.display = "block";
            } else {
                var preview = document.getElementById("ava-preview");
                preview.src = "http://cdn.onlinewebfonts.com/svg/img_24787.png";
                preview.style.display = "block";
            }
        }
    }

    return (
        <div>
            <div class="modal fade" id="editAvaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form encType="multipart/form-data" onSubmit={handleSubmit(submitAva)}>
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Profile Picture</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <img src="http://cdn.onlinewebfonts.com/svg/img_24787.png" id="ava-preview" class="rounded-circle mx-auto my-auto d-block" width="200" height="200" style={{ objectfit: "cover" }} alt="Profile Image" />
                                <h6 class="text-center my-2">Preview Image</h6>

                                <div class="my-3">
                                    <label for="formFile" class="form-label">Upload image from computer</label>
                                    <input type="file" id="formFile" name="avatar" className={`form-control ${errors.avatar
                                        ? 'is-invalid'
                                        : ''}`} {...register('avatar')} onChange={(e) => { showPreview(e); setAva(e.target.files[0]) }} />
                                    <div className='invalid-feedback'>
                                        {errors.avatar?.message}
                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" >Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}