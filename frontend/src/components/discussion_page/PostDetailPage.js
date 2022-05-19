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
        if(commentData.content !== ''){
            dispatch(addComment(dataArray));
        }
        setCommentData({
            content: '', images: null
        })
        document.getElementById("addCommentForm").reset();

    }

    return (
        <div class="container" style={{ marginTop: 80, marginBottom: 80 }}>
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="row my-3">
                        <div className='d-flex'>
                            {/* <p className='my-auto'>Post by: </p> */}
                            <img src={`${post_detail[0]?.users[0]?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${post_detail[0]?.users[0]?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `}
                                class="img rounded-circle m-2" width="30" height="30" alt="" style={{border: "1px solid #ffc13b"}}></img>
                            <a href={`/client/profile/${post_detail[0]?.user_id}`} className='my-auto' style={{ "text-decoration": "none", color: "white" }}>
                                <h3>{post_detail[0]?.users[0]?.name}&nbsp;({post_detail[0]?.users[0]?.username})</h3>
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <div>
                                <p className='my-auto' style={{color: "#ffc13b"}}>{moment(post_detail[0]?.updatedAt).fromNow()}</p>
                            </div>
                            
                        </div>
                        <hr style={{color: "#1e3d59"}}></hr>
                        <div className="row d-flex">
                            <div className='col-md-7 col'>
                                <h1 style={{color: "#ffc13b"}}>{post_detail[0]?.title}</h1>
                            </div>
                            <div className='col-md-5 col d-flex justify-content-end align-items-center'>
                                <div className='ms-auto'>
                                    {role && role.includes('admin') && authData?._id !== post_detail[0]?.user_id && <button type='button' className='btn mx-1' style={{ width: '160px', height: '40px', color: "red" }}
                                        onClick={(e) => { e.preventDefault(); dispatch(deletePost(post_id)); window.location.replace(`/client/discussion/${post_detail[0].languages[0]._id}/general`) }}>
                                        <i class="bi bi-trash"> Delete Post</i>
                                    </button>}
                                    {authData?._id === post_detail[0]?.user_id && <a href={`/client/editpost/${post_detail[0]?._id}`} style={{ width: '160px', height: '40px' }}
                                        ><button className='btn my-1' style={{color: "#ffc13b"}}><i class="bi bi-pencil-square">  Edit Post</i></button></a>}
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-lg-5 col-12">
                                {/* <label for="Langauge" style={{color: "#ffc13b"}}>Language:&nbsp;</label> */}
                                <span style={{color: "#ffc13b"}}>#{post_detail[0]?.languages[0]?.name}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {/* <label for="Topic" class="ms-1" style={{color: "#ffc13b"}}>Topic:&nbsp;</label> */}
                                <span style={{color: "#ffc13b"}}>#{post_detail[0]?.categories[0]?.name}</span>
                            </div>
                        </div>
                        <hr style={{color: "#1e3d59"}}></hr>
                        <div class="row justify-content-center mb-3">
                            <p class="text-break" style={{color: "white"}}>{post_detail[0]?.content && nl2br(post_detail[0]?.content)}
                            </p>
                            <div class="col-10">
                                {post_detail[0]?.images && post_detail[0]?.images != '' ? <img class="img-thumbnail mx-auto d-block"
                                    src={`https://csfunctions-web-app.s3.amazonaws.com/${post_detail[0]?.images}`}
                                    style={{ maxWidth: '500px', maxHeight: '500px' }}
                                    alt=""></img> : <></>}
                            </div>
                        </div>
                        <div class="row justify-content-center mb-3" >
                            {authData && <div class="col-9 mt-3 py-2" style={{ backgroundColor: "#152039" }}>
                                <form encType="multipart/form-data" id='addCommentForm' onSubmit={handleSubmit(submit)}>
                                    <div class="input-group my-2">
                                        <textarea name="content" className={`form-control ${errors.content
                                            ? 'is-invalid'
                                            : ''}`} placeholder="Write a public comment..."
                                            id="FunctionResult" {...register('content')} value={commentData.content} onChange={(e) => setCommentData({ ...commentData, content: e.target.value })} rows="2" ></textarea>
                                        <div className='invalid-feedback'>
                                            {errors.content?.message}
                                        </div>
                                    </div>
                                    <input name="post_id" type="hidden" value={commentData.post_id} />
                                    {/* <input name="user_id" type="hidden" value={commentData.user_id} /> */}
                                    <div class="d-grid gap-2 d-flex">
                                        <div class="custom-file">
                                            <input type="file" name="images" style= {{color: "#ffc13b"}}className={`custom-file-input ${errors.images
                                                ? 'is-invalid'
                                                : ''}`} {...register('images')} onChange={(e) => { setCommentData({ ...commentData, images: e.target.files[0] }) }} id="inputGroupFile01" />
                                            <div className='invalid-feedback'>
                                                {errors.images?.message}
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary ms-auto">Submit</button>
                                    </div>
                                </form>
                            </div>
                            }
                            <div class="col-sm-12 col-lg-10 col-md-12 mt-3">
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