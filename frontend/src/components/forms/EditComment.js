export default function EditComment() {
    return (
        <div>
            <button type="button" class="btn btn-warning ml-auto" data-bs-toggle="modal" data-bs-target="#editPost">
                Edit
            </button>
            <div class="modal" id="editPost" aria-labelledby="editFunctionModel" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row mb-3">
                                    <h3 class="text-center">EDIT COMMENT</h3>
                                </div>
                                <br />
                                <form class="row">
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <textarea class="form-control" placeholder="Comment" id="postcomment"
                                                rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="row ms-1">
                                        <div className='custom-file input-group mb-3'>
                                            <label className='custom-file-label col-12' for='commentimage'>
                                                Upload Image
                                            </label>
                                            <input type='file' className="custom-file-input col-12" name="image" id='commentimage' />
                                            {/* <div className='invalid-feedback'>
                                                {errors.image?.message}
                                            </div> */}
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row ms-1">
                                        <div class="d-grid gap-2 d-flex justify-content-end">
                                            <button type="button" class="btn btn-primary">SAVE CHANGES</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}