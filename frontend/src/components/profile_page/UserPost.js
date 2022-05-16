import * as moment from 'moment';
export default function UserPost({ post, userInfo }) {
    return (

        <div class="container-fluid">
            <div class="row">
                <div class="d-flex justify-content-center">
                    <div class="col-lg-8 col-12">
                        <div class="card mb-4 mt-3 row">
                            <div class="card-header text-muted" style={{ backgroundColor: "#1e3d59", color: "white" }}>
                                <div>
                                    <a
                                        href="#"
                                        style={{ "text-decoration": "none", color: "white" }}
                                    >
                                        Posted by: @{userInfo.name}&nbsp;({userInfo.username})
                                    </a>
                                    <span class="float-end" style={{ color: "white" }}>
                                        {moment(post.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                            <a href={`/client/postdetail/${post._id}`} style={{ "textDecoration": "none", color: "black" }}>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        {post.title}
                                    </h3>
                                    <p class="class-text">{post.content && post.content && post.content.length > 400
                                        ? post.content.substring(0, 399) + '......'
                                        : post.content}</p>
                                </div>
                            </a>

                            <div class="card-footer text-muted  d-flex bd-highlight">
                                <span class='mt-2'>
                                    <i class="bi bi-hand-thumbs-up"></i>
                                </span>
                                <span class="numberOfLikes p-2 bd-highlight">
                                    {post.votes.length} Likes
                                </span>
                                <span class='mt-2'>
                                    <i class="bi bi-reply"></i>
                                </span>
                                <a href={`/client/postdetail/${post._id}`} style={{ "textDecoration": "none", color: "black" }}><span class="numberOfLikes ms-2 p-2 bd-highlight">
                                    Replies
                                </span></a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}