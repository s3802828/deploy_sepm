import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { updateComment, deleteComment } from "../../redux_sepm/actions/post_details";
import { useParams } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as moment from 'moment'

import { nl2br } from '../../utils/index'

export default function Comment({ comment, post_id }) {

    const validationSchema = Yup.object().shape({
        content: Yup.string().trim()
            .required('Content is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_();@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
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
            }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { authData } = useSelector((state) => state?.authReducer);

    const [edit, setEdit] = useState(false);
    const [commentData, setCommentData] = useState({
        _id: comment._id, content: comment.content, images: null
    })

    const dispatch = useDispatch();

    const submit = (form, e) => {

        e.preventDefault();
        const dataArray = new FormData();
        dataArray.append("_id", commentData._id);
        dataArray.append("content", commentData.content);
        if (commentData.images != null) {
            dataArray.append("images", commentData.images, { type: 'image/jpeg' });
        }

        dispatch(updateComment(dataArray));
    }

    console.log(comment?.images)

    console.log(authData?.avatar)

    return (
        <div>
            <div class="container-fluid my-3">
                <div class="row justify-content-center my-1">
                    <div class="col-10" style={{ backgroundColor: "#adab9a" }}>
                        <div class="row justify-content-between ms-3">
                            <div class="col-6 d-flex align-items-center justify-content-start">
                                <a href={`/client/profile/${comment?.user_id}`} style={{ "text-decoration": "none", color: "black" }}><img src={`${comment?.users[0]?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${comment?.users[0]?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `}
                                    class="img rounded-circle m-2" width="40" height="40" alt=""></img>
                                <label id="commentOwner">{comment?.users[0]?.name}&nbsp;({comment?.users[0]?.username})</label></a>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-end">
                                {authData && authData._id === comment?.user_id && (edit === true
                                    ? <div></div>
                                    :
                                    <div class="dropend d-flex">
                                        <button type="button" class="btn btn-primary ms-auto dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item" onClick={() => setEdit(true)}>Edit</button></li>
                                            <li><button class="dropdown-item" onClick={() => { dispatch(deleteComment(commentData._id)); window.location.replace(`/client/postdetail/${commentData?.post_id}`) }}>Delete</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <div class="row justify-content-end">
                                        <div class="text-end my-2 mx-2">
                                            Last update: {moment(comment?.updatedAt).fromNow()}
                                        </div>
                                    </div>

                                    <div class="row justify-content-center my-1">
                                         {edit === true
                                            ? <form encType="multipart/form-data" onSubmit={handleSubmit(submit)}>
                                                <textarea name="content" value={commentData?.content} className={`form-control ${errors.content
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('content')} onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}>
                                                    {/* Comment */}
                                                </textarea>
                                                <div className='invalid-feedback'>
                                                    {errors.content?.message}
                                                </div>
                                                <input name="_id" type="hidden" value={commentData._id} />
                                                <div class="custom-file my-2">
                                                    <input type="file" name="images" className={`custom-file-input ${errors.images
                                                        ? 'is-invalid'
                                                        : ''}`} {...register('images')} onChange={(e) => { console.log(e.target.files[0]); setCommentData({ ...commentData, images: e.target.files[0] }) }} class="custom-file-input" id="inputGroupFile01" />
                                                    <div className='invalid-feedback'>
                                                        {errors.images?.message}
                                                    </div>
                                                </div>
                                                <div class="d-flex my-3">
                                                    <button type="button" class="btn btn-danger me-auto" onClick={() => { dispatch(deleteComment(commentData._id)); window.location.replace("/postdetail") }}>Delete</button>

                                                    <button type="button" class="btn btn-light me-2" onClick={() => setEdit(!edit)}>Cancel</button>
                                                    <button type="submit" class="btn btn-primary me-2" >Save</button>

                                                </div>
                                            </form>:
                                            <p>{comment?.comment && nl2br(comment?.content)}</p>
                                            }
                                        {comment?.images && comment?.images != "" ? <img className="mb-2" src={`https://csfunctions-web-app.s3.amazonaws.com/${comment.images}`}></img>
                                            : <></>}
                                    </div>

                                </div >

                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div>
    )
}