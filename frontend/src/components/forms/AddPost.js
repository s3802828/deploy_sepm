import weblogo from '../../assets/weblogo.jpg';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addPost } from '../../redux_sepm/actions/posts'
import { getTopicFromLang } from '../../redux_sepm/actions/language';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function AddPost({ lang, language_id, topic_id }) {

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .trim()
            .required('Name is required')
            .matches(
                /^(?!()[ ]+$)[a-zA-Z0-9 .]*$/,
                'Name must only contain letters and space'
            ),
        content: Yup.string()
            .trim()
            .required('Description is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
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
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { authData } = useSelector((state) => state.authReducer)

    const [postData, setPostData] = useState({
        user_id: '', category_id: '', title: '', content: '', images: null
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopicFromLang(language_id));
    }, [dispatch])

    const topicList = useSelector((state) => state.categories);
    // const languages = useSelector((state) => state.languages);

    const add = () => {
        console.log(postData)

        const dataArray = new FormData();

        dataArray.append("user_id", authData._id);
        dataArray.append("category_id", postData.category_id);
        dataArray.append("title", postData.title);
        dataArray.append("content", postData.content);
        if (postData.images != null) {
            dataArray.append("images", postData.images);
        }
        console.log(postData.images)
        dispatch(addPost(dataArray))
        window.location.replace(`/client/discussion/${language_id}/${topic_id}`)
    }

    return (
        <div>
            <div className='pt-3'>
                <div className='card mb-4'>
                    <div className='card-header text-center' style={{backgroundColor: "#1e3d59", color: "white"}}>
                        CREATE NEW POST
                    </div>

                    <div className='card-body container-fluid'>
                        <form enctype='multipart/form-data' onSubmit={handleSubmit(add)}>
                            <div className='row'>
                                <div className='form-group mb-3 col-7'>
                                    <label for='posttitle'>Title</label>
                                    <input type='text' name="title" label='title' //value={postData.title}
                                        className={`form-control border border-secondary ${errors.title
                                            ? 'is-invalid'
                                            : ''}`} {...register('title')}
                                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                                        placeholder='Post Title' id='posttitle' />
                                    <div className='invalid-feedback'>
                                        {errors.title?.message}
                                    </div>
                                </div>
                                <div className='form-group mb-3 col-5'>
                                    <div hidden>
                                        Language:&nbsp;
                                        {lang.filter(lang => lang._id == topic_id.language_id).map(lang => {
                                            return (
                                                lang.name
                                            )
                                        })}
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
                                            <option selected>Choose topic</option>
                                            {topicList.map(topic => {
                                                return (
                                                    <option value={topic._id}>{topic.name}</option>
                                                )
                                            })}
                                        </select>
                                        <div className='invalid-feedback'>
                                            {errors.category_id?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <label for='postcontent'>Content</label>
                                    <textarea placeholder='Post Content' className={`form-control border border-secondary ${errors.content
                                        ? 'is-invalid'
                                        : ''}`} {...register('content')}
                                        name="content" lable='content' id='postcontent' //value={postData.content}
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
                                    <button type='submit' className='btn btn-warning'
                                    // onClick={() => {
                                    //     unregister('title', { keepDefaultValue: true, });
                                    //     unregister('content', { keepDefaultValue: true, });
                                    //     unregister('category_id', { keepDefaultValue: true, });
                                    //     unregister('images', { keepDefaultValue: true, });
                                    // }}
                                    >
                                        UPLOAD
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}