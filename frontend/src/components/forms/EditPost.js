import weblogo from '../../assets/weblogo.jpg';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getPostDetail, updatePost } from '../../redux_sepm/actions/posts'
import { deletePost } from '../../redux_sepm/actions/posts';
import { getTopicFromLang } from '../../redux_sepm/actions/language';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function EditPost() {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .trim()
            .required('Name is required')
            .matches(
                /^(?![ ]+$)[a-zA-Z .]*$/,
                'Name must only contain letters and space'
            ),
        content: Yup.string()
            .trim()
            .required('Description is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_();@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        category_id: Yup.string().test(
            'value',
            'Category is required',
            (value) => {
                if (value === '0') {
                    return false;
                }
                return true;
            }
        ),
        images: Yup.mixed()

            .test('fileSize', 'The file is too large', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return value[0].size <= 2000000;
            })
            .test('fileType', 'Only jpeg/png file is accepted', (value) => {
                if (!value.length) {
                    return true; // attachment is optional
                }
                return (
                    value[0].type === 'image/jpeg' ||
                    value[0].type === 'image/png'
                );
            }
        ),
    })

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        shouldUnregister: true,
        mode: 'onSubmit'
    });

    const { post_id } = useParams()
    const { authData } = useSelector((state) => state.authReducer)

    const dispatch = useDispatch();

    const post_detail = useSelector((state) => state.posts)
    const [topic_id, setTopicId] = useState(undefined)

    const [postData, setPostData] = useState({
        _id: post_id, user_id: '', title: post_detail[0]?.title, content: post_detail[0]?.content, images: '', category_id: post_detail[0]?.category_id
    });

    useEffect(() => {
        dispatch(getPostDetail(post_id));
        // topic_id = post_detail[0]?.category_id

    }, [dispatch])

    useEffect(() => {
        if (topic_id != undefined) {
            dispatch(getTopicFromLang(post_detail[0]?.languages[0]._id));
        }
    }, [topic_id])

    useEffect(() => {
        if (post_detail) {
            setPostData({
                _id: post_id, user_id: '', title: post_detail[0]?.title, content: post_detail[0]?.content, images: null, category_id: post_detail[0]?.category_id
            });
            setTopicId(post_detail[0]?.category_id)
        }
    }, [post_detail])

    useEffect(() => {
        if (post_detail[0]?.user_id && (authData?._id != post_detail[0]?.user_id)) {
            window.location.replace(`/`)
            console.log("should reload")
        }
    }, [authData, post_detail])

    const topicList = useSelector((state) => state?.categories);
    console.log(postData._id)

    const update = () => {
        console.log(postData)

        const dataArray = new FormData();

        dataArray.append("_id", postData._id);
        dataArray.append("category_id", postData.category_id);
        dataArray.append("title", postData.title);
        dataArray.append("content", postData.content);

        if (postData.images != null) {
            dataArray.append("images", postData.images);
        }

        dispatch(updatePost(dataArray))
        window.location.replace(`/client/postdetail/${post_id}`)
    }

    return (
        <div class="container-fluid" style={{ marginTop: 80, marginBottom: 80 }}>
            <div className="row justify-content-center">
                <div className='card mb-4 col-6'>

                    <div className='card-header text-center'>
                        EDIT POST
                    </div>

                    <div className='card-body container-fluid'>
                        <form enctype='multipart/form-data' onSubmit={handleSubmit(update)}>
                            <div className='row'>
                                <input type='hidden' name="_id" lable="_id" value={post_id} />
                                <div className='form-group mb-3 col-7'>
                                    <label for='posttitle'>Title</label>
                                    <input type='text' name="title" label='title' value={postData?.title} className={`form-control border border-secondary ${errors.title
                                        ? 'is-invalid'
                                        : ''}`} {...register('title')}
                                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                                        placeholder='Post Title' id='posttitle'></input>
                                    <div className='invalid-feedback'>
                                        {errors.title?.message}
                                    </div>
                                </div>
                                <div className='form-group mb-3 col-5'>
                                    <div hidden>
                                        Language:&nbsp;
                                        {post_detail[0]?.languages[0].name}
                                    </div>
                                    <label for='postcate'>
                                        Category
                                    </label>
                                    <div>
                                        <select id="InputTopic" name='topic' lable='topic'
                                            className={`form-select ${errors.category_id
                                                ? 'is-invalid'
                                                : ''}`} {...register('category_id')}
                                            onChange={(e) => setPostData({ ...postData, category_id: e.target.value })}>
                                            {/* <option value={topic_id} selected> {post_detail[0]?.categories[0].name} </option> */}
                                            {topicList.map(topic => {
                                                return (
                                                    <option value={topic._id} selected={topic._id == topic_id && 'selected'}>{topic.name}</option>
                                                )
                                            })}
                                        </select>
                                        <div className='invalid-feedback'>
                                            {errors.category_id?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group mb-3'>
                                <label for='postcontent'>Content</label>
                                <textarea placeholder='Post Content' name="content" lable='content' value={postData?.content} id='postcontent'
                                    className={`form-control border border-secondary ${errors.content
                                        ? 'is-invalid'
                                        : ''}`} {...register('content')}
                                    onChange={(e) => setPostData({ ...postData, content: e.target.value })}></textarea>
                                <div className='invalid-feedback'>
                                    {errors.content?.message}
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <div className='custom-file'>
                                    <label className='custom-file-label' for='postimage'>
                                        Upload Image
                                    </label>
                                    <br />
                                    <input type='file' name="images" lable='images' id='postimage' className={`custom-file-input ${errors.images
                                        ? 'is-invalid'
                                        : ''}`} {...register('images')} 
                                        onChange={(e) => setPostData({ ...postData, images: e.target.files[0] })} />
                                    <div className='invalid-feedback'>
                                        {errors.image?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 d-flex justify-content-end">
                                &nbsp;&nbsp;
                                <button type='button' className='btn btn-danger' onClick={(e) => { e.preventDefault(); dispatch(deletePost(post_id)); window.location.replace(`/client/discussion/${post_detail[0].languages[0]._id}/general`) }}>
                                    DELETE THIS POST
                                </button>
                                <button type='submit' className='btn btn-success'
                                    onClick={() => {
                                        unregister('title', { keepDefaultValue: true, });
                                        unregister('content', { keepDefaultValue: true, });
                                        unregister('category_id', { keepDefaultValue: true, });
                                        unregister('images', { keepDefaultValue: true, });
                                    }}
                                >
                                    SAVE CHANGES
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}