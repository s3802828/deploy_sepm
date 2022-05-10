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
        // alert("Copied text");

    }
    // useEffect(() => {
    //     dispatch(getSavedFunction(authData._id))
    // }, [dispatch])

    // const usersavedFunction = useSelector((state) => state.profileSavedFunction)

    // useEffect(() => {
    //     if (authData?.savedFunction.includes(func._id)){
    //         setClicked(true)
    //     }
    // }, [])



    return (
        <div>
            <div class="alert alert-success text-center" id="savedcopy-alert" style={{ position: 'fixed', bottom: 10, width: '85%', display: "none" }}>
                Copied to clipboard
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
                            <h5>{func_detail.name}</h5>
                        </div>
                        <div class="col-1" >
                            <img src={open == false ? "https://cdn-icons-png.flaticon.com/512/271/271210.png" : "https://cdn-icons-png.flaticon.com/512/271/271239.png"} style={{ width: 20, height: 20 }} onClick={() => setOpen(!open)} />

                        </div>
                    </div>
                </div>

                {/* <Collapse in={open}>
                    <div className="text-dark" >
                        <h6>Parameters</h6>
                        <div className="bg-light ">
                            <div style={{ padding: 5, marginBottom: 10 }}>
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
                                    <button type="button" class="btn btn-outline-secondary ms-auto" onClick={() => { copyFunction(); }}>
                                        {copied == false ? "Copy" : "Copied"}
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

                </Collapse> */}

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

