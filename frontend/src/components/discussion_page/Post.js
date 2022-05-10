import * as moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dislike, like } from '../../redux_sepm/actions/post'

import { nl2br } from '../../utils/index'

export default function Post({ post }) {
    const { authData, role } = useSelector((state) => state?.authReducer)
    const [isLiked, setIsLiked] = useState(false)
    const [voteCount, setVoteCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        setVoteCount(post.votes.length)
    }, [])
    useEffect(() => {
        if (post?.votes.includes(authData?._id)) {
            setIsLiked(true)
        }
    }, [authData])
    return (
        <div class="container-fluid">
            <div class="card mb-4 row">
                <div class="card-header text-muted">
                    <div>
                        <a
                            href={`/profile/${post.user_id}`}
                            style={{ "text-decoration": "none", color: "black" }}
                        >
                            Posted by: {post.users[0]?.name}@{post.users[0]?.username}
                        </a>
                        <span class="float-end">
                            {moment(post.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                <a href={`/postdetail/${post._id}`} style={{ "textDecoration": "none", color: "black" }}>
                    <div class="card-body">
                        <h3 class="card-title">
                            {post.title}
                        </h3>
                        {/* <p class="class-text overflow-hidden" style={{height: "70px"}}>{post.content && post.content && post.content.length > 400
                            ? nl2br(post.content.substring(0, 399)) + '......'
                            : nl2br(post.content)}</p> */}
                        <p class="class-text overflow-hidden" style={{ height: "70px" }}>{post.content && nl2br(post.content)}</p>
                    </div>
                </a>

                <div class="card-footer text-muted  d-flex bd-highlight">
                    <span class='mt-2' style={isLiked ? { color: "#0d6efd" } : { color: 'black' }} onClick={() => {
                        if (role) {
                            if (!isLiked) {
                                dispatch(like(post._id, authData?._id))
                                setVoteCount(voteCount + 1)
                            } else {
                                dispatch(dislike(post._id, authData?._id))
                                setVoteCount(voteCount - 1)
                            }
                            setIsLiked(!isLiked);
                        }
                    }}>
                        <i class="bi bi-hand-thumbs-up"></i>
                        <span class="numberOfLikes p-2 bd-highlight" >
                            {voteCount} Likes
                        </span>
                    </span>
                    <span class="numberOfLikes p-2 bd-highlight">
                        <a href={`/postdetail/${post._id}`} style={{ "textDecoration": "none", color: "black" }}><i class="bi bi-reply"></i> <span className='ms-2'>Replies</span></a>
                    </span>
                    {/* </span> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}