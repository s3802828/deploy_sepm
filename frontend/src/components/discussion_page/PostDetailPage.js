import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, getCommentForPost, deletePost } from "../../redux_sepm/actions/posts";
import { useParams } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as moment from 'moment'

import Comment from "./Comment";
import { addComment } from "../../redux_sepm/actions/post_details";

import { nl2br } from '../../utils/index'

export default function PostDetailPage() {

    const dispatch = useDispatch();
    const { authData, role } = useSelector((state) => state?.authReducer)
    console.log(role)

    const validationSchema = Yup.object().shape({
        content: Yup.string().trim()
            .required('Content is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_();@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        images: Yup.mixed()

            .test('fileSize', 'The file is too large. Must be smaller than 8MB', (value) => {
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

    const [commentData, setCommentData] = useState({
        content: '', images: null
    })
    const { post_id } = useParams();

    useEffect(() => {
        dispatch(getPostDetail(post_id));
        dispatch(getCommentForPost(post_id));
    }, [dispatch])

    const post_detail = useSelector((state) => state.posts)
    console.log(post_detail)

    const post_comments = useSelector((state) => state.comment)

    const submit = (form, e) => {

        e.preventDefault();

        const dataArray = new FormData();
        dataArray.append("post_id", post_id);
        dataArray.append("user_id", authData._id);
        dataArray.append("content", commentData.content);
        if (commentData.images != null) {
            dataArray.append("images", commentData.images, { type: 'image/jpeg' });
        }

        dispatch(addComment(dataArray));

        console.log(commentData.images);
    }

    return (
        <div class="container-fluid" style={{ marginTop: 80, marginBottom: 80 }}>
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="row my-3">
                        <div className='d-flex'>
                            <p className='my-auto'>Post by: </p>
                            <img src={`${post_detail[0]?.users[0]?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${post_detail[0]?.users[0]?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `}
                                class="img rounded-circle m-2" width="30" height="30" alt=""></img>
                            <a href={`/client/profile/${post_detail[0]?.user_id}`} className='my-auto' style={{ "text-decoration": "none", color: "black" }}>
                                {post_detail[0]?.users[0]?.name}&nbsp;({post_detail[0]?.users[0]?.username})
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <p className='my-auto'>Last Updated: {moment(post_detail[0]?.updatedAt).fromNow()}</p>
                        </div>
                        <div className="row d-flex">
                            <div className='col'>
                                <h2>{post_detail[0]?.title}</h2>
                            </div>
                            <div className='col-md-5 col justify-content-end align-items-center'>
                                <div className='d-flex'>
                                    {role && role.includes('admin') && <button type='button' className='btn btn-danger ms-auto mx-1' style={{ width: '160px', height: '40px' }} onClick={(e) => { e.preventDefault(); dispatch(deletePost(post_id)); window.location.replace(`/client/discussion/${post_detail[0].languages[0]._id}/general`) }}>
                                        DELETE THIS POST
                                    </button>}
                                    {authData?._id === post_detail[0]?.user_id && <a type='button' href={`/client/editpost/${post_detail[0]?._id}`} style={{ width: '160px', height: '40px' }} class="btn btn-warning ms-auto my-1">EDIT THIS POST</a>}
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-5 col-12">
                                <label for="Langauge">Language:&nbsp;</label>
                                <span>{post_detail[0]?.languages[0]?.name}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <label for="Topic" class="ms-1">Topic:&nbsp;</label>
                                <span>{post_detail[0]?.categories[0]?.name}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-3">
                            <p class="text-break">{post_detail[0]?.content && nl2br(post_detail[0]?.content)}
                            </p>
                            <div class="col-10">
                                {post_detail[0]?.images && post_detail[0]?.images != '' ? <img class="img-thumbnail mx-auto d-block"
                                    src={`https://csfunctions-web-app.s3.amazonaws.com/${post_detail[0]?.images}`}
                                    style={{ maxWidth: '500px', maxHeight: '500px' }}
                                    alt=""></img> : <></>}
                            </div>
                        </div>
                        <div class="row justify-content-center mb-3" >
                            {authData && <div class="col-10 mt-3 py-2" style={{ backgroundColor: "#adab9a" }}>
                                <form encType="multipart/form-data" onSubmit={handleSubmit(submit)}>
                                    <div class="input-group my-2">
                                        <textarea name="content" className={`form-control ${errors.content
                                            ? 'is-invalid'
                                            : ''}`} placeholder="Enter Comment Here..."
                                            id="FunctionResult" {...register('content')} value={commentData.content} onChange={(e) => setCommentData({ ...commentData, content: e.target.value })} rows="2" ></textarea>
                                        <div className='invalid-feedback'>
                                            {errors.content?.message}
                                        </div>
                                    </div>
                                    <input name="post_id" type="hidden" value={commentData.post_id} />
                                    {/* <input name="user_id" type="hidden" value={commentData.user_id} /> */}
                                    <div class="d-grid gap-2 d-flex">
                                        <div class="custom-file">
                                            <input type="file" name="images" className={`custom-file-input ${errors.images
                                                ? 'is-invalid'
                                                : ''}`} {...register('images')} onChange={(e) => { console.log(e.target.files[0]); setCommentData({ ...commentData, images: e.target.files[0] }) }} id="inputGroupFile01" />
                                            <div className='invalid-feedback'>
                                                {errors.images?.message}
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary ms-auto">Submit</button>
                                    </div>
                                </form>
                            </div>
                            }
                            <div class="col-10 mt-3">
                                {post_comments.map((element) =>

                                    <Comment comment={element} post_id={post_id} post_detail={post_detail} />,
                                    <br />
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}