import { useEffect, useState } from "react"
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

    const { authData, role } = useSelector((state) => state?.authReducer);

    const [edit, setEdit] = useState(false);
    const [commentData, setCommentData] = useState({
        _id: comment._id, content: comment.content, images: null
    })

    useEffect(() => {
        setCommentData(
            { _id: comment._id, content: comment.content, images: null }
        )
    }, [comment])

    const dispatch = useDispatch();

    const submit = (form, e) => {

        e.preventDefault();
        const dataArray = new FormData();
        dataArray.append("_id", commentData._id);
        dataArray.append("content", commentData.content);
        if (commentData.images != null) {
            dataArray.append("images", commentData.images, { type: 'image/jpeg' });
        }
        dispatch(updateComment(post_id, dataArray));
    }

    return (
        <div>
            <div class="container-fluid my-3">
                <div class="row justify-content-center my-1 me-3">
                    <div class="col-2 d-flex justify-content-end">
                    <img src={`${comment?.users[0]?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${comment?.users[0]?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `}
                                    class="img rounded-circle m-2" width="40" height="40" alt="" style={{border: "1px solid #ffc13b"}}></img>
                    </div>
                    <div class="col-10 rounded" style={{ border: "2px solid #ffc13b"}}>
                        <div class="row justify-content-between ms-1 rounded" >
                            <div className="d-flex">
                                {/* <img src={`${comment?.users[0]?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${comment?.users[0]?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `}
                                    class="img rounded-circle m-2" width="40" height="40" alt=""></img> */}
                                <a href={`/client/profile/${comment?.user_id}`} className='my-auto' style={{ "text-decoration": "none", color: "black" }}>
                                    <h6 style={{ color: "#ffc13b" }}>{comment?.users[0]?.name}&nbsp;({comment?.users[0]?.username})</h6></a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <p className='my-auto' style={{ color: "#ffc13b" }}>{moment(comment?.updatedAt).fromNow()}</p>
                                <div className="ms-auto my-auto">
                                    {authData && authData._id === comment?.user_id && (edit == true
                                        ? <div></div>
                                        :
                                        // <div class="dropend d-flex">
                                        //     <button type="button" class="btn btn-secondary ms-auto dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-gear"></i></button>
                                        //     <ul class="dropdown-menu">
                                        //         <li><button class="dropdown-item" onClick={() => setEdit(true)}>Edit</button></li>
                                        //         <li><button class="dropdown-item" onClick={() => { dispatch(deleteComment(commentData._id)); window.location.replace(`/client/postdetail/${post_id}`) }}>Delete</button></li>
                                        //     </ul>
                                        // </div>
                                        <div className="d-flex">
                                            <button class="btn ms-auto" onClick={() => setEdit(true)} style={{ color: "#ffc13b" }}><i class="bi bi-pencil-square"> Edit</i></button>
                                        </div>
                                    )}
                                    {authData && role.includes('admin') && authData._id !== comment?.user_id &&
                                        <div className="d-flex">
                                            <button type="button" class="btn ms-auto" onClick={() => { dispatch(deleteComment(comment._id)); window.location.replace(`/client/postdetail/${post_id}`) }} style={{color: "red"}}><i class="bi bi-trash"> Delete</i></button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div class="row justify-content-center my-1">
                                {edit === true
                                    ? <form encType="multipart/form-data" onSubmit={handleSubmit(submit)}>
                                        <textarea name="content" defaultValue={comment?.content} className={`form-control ${errors.content
                                            ? 'is-invalid'
                                            : ''}`} {...register('content')} onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}>
                                            {/* Comment */}
                                        </textarea>
                                        <div className='invalid-feedback'>
                                            {errors.content?.message}
                                        </div>
                                        <input name="_id" type="hidden" value={comment._id} />
                                        <div class="custom-file my-2">
                                            <input type="file" name="images" style = {{color: "#ffc13b"}} className={`custom-file-input ${errors.images
                                                ? 'is-invalid'
                                                : ''}`} {...register('images')} onChange={(e) => { setCommentData({ ...commentData, images: e.target.files[0] }) }} class="custom-file-input" id="inputGroupFile01" />
                                            <div className='invalid-feedback'>
                                                {errors.images?.message}
                                            </div>
                                        </div>
                                        <div class="d-flex my-3">
                                            <button type="button" class="btn btn-danger me-auto" onClick={() => { dispatch(deleteComment(comment._id)); window.location.replace(`/client/postdetail/${post_id}`) }}>Delete</button>

                                            <button type="button" class="btn btn-light me-2" onClick={() => setEdit(!edit)}>Cancel</button>
                                            <button type="submit" class="btn btn-success me-2" >Save</button>

                                        </div>
                                    </form> :
                                    <p style={{ color: "white" }}>{comment?.content && nl2br(comment?.content)}</p>
                                }
                                {/* {comment?.images && comment?.images != "" ? <img className="mb-2" style={{ maxWidth: '400px', maxHeight: '400px' }}
                                    src={`https://csfunctions-web-app.s3.amazonaws.com/${comment.images}`}></img>
                                    : <></>} */}
                            </div>
                        </div >
                        {comment?.images && comment?.images != "" ? <img className="my-2 ms-1 rounded" style={{ maxWidth: '400px', maxHeight: '400px'}}
                                    src={`https://csfunctions-web-app.s3.amazonaws.com/${comment.images}`}></img>
                                    : <></>}
                    </div >
                </div >
            </div >
        </div>
    )
}