import { Collapse } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savedFunction, unsavedFunction } from '../../redux_sepm/actions/language';
import { getSavedFunction } from '../../redux_sepm/actions/profile';

export default function UserSavedFunctions({ func_detail, user_id }) {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const dispatch = useDispatch();
    const { authData, role } = useSelector((state) => state.authReducer)
    const copyFunction = (text) => {

        navigator.clipboard.writeText(text);
        document.getElementById("savedcopy-alert").style.display = "block";
        setTimeout(() => { document.getElementById("savedcopy-alert").style.display = "none" }, 2000);
        

    }



    return (
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="d-flex justify-content-center">
                        <div class="col-lg-8 col-12">
                            <div className='d-flex justify-content-center'>
                                <div class="alert alert-success text-center" id="savedcopy-alert" style={{ position: 'fixed', zIndex: 1000, bottom: 10, width: '50%', display: "none" }}>
                                    Copied to clipboard
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-black" style={{ padding: 6 }} >
                <div class="fluid-container" >
                    <div class="row">
                        {authData?._id === user_id ? <div class="col-1">
                            <span>
                                <button class="btn btn-outline-danger" onClick={() => {
                                    dispatch(unsavedFunction(func_detail._id, authData?._id))
                                }} >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </span>
                        </div> : <></>}
                        <div class="col-10" >
                            <h5 style={{ color: "white" }}>{func_detail.name}</h5>
                        </div>
                        <div class="col-1" >
                            <h3>{open == false ? <i class="bi bi-caret-down-fill" style={{ color: "white" }} onClick={() => setOpen(!open)} ></i> : <i class="bi bi-caret-up-fill" style={{ color: "white" }} onClick={() => setOpen(!open)}></i>}</h3>

                        </div>
                    </div>
                </div>

                <Collapse in={open}>
                    <div className="text-dark bg-light rounded mt-3" style={{ border: "1px solid black" }} >
                        <div className='border-bottom border-1 border-dark p-3'>
                            <h5>Parameters</h5>
                            <hr></hr>
                            <div>
                                {func_detail.params}
                            </div>
                        </div>

                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>Description</h5>
                            <hr></hr>
                            <div >
                                {func_detail.description}
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <div>
                                <div class="d-flex">
                                    <h5>Example</h5>
                                    <button type="button" class="btn btn-outline-secondary ms-auto" onClick={() => { copyFunction(func_detail.example_question); }}>
                                        Copy
                                    </button>
                                </div>


                                <hr></hr>
                                <pre>
                                    <code>
                                        {func_detail.example_question}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>Output</h5>
                            <hr></hr>
                            <div>
                                {func_detail.example_result}
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>More details</h5>
                            <hr></hr>
                            <a href={`${func_detail.more_detail}`}>
                                {func_detail.more_detail}
                            </a>
                        </div>


                    </div>

                </Collapse>
            </div>

        </div>
    )
}

