import { Collapse } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditFunction from '../forms/EditFunction';
import { savedFunction, unsavedFunction } from '../../redux_sepm/actions/language';
import { getDetailFromFunction } from '../../redux_sepm/actions/language';

import { nl2br } from '../../utils/index'

export default function FunctionDropdown({ func, category_id }) {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const dispatch = useDispatch();
    const { authData, role } = useSelector((state) => state.authReducer)

    function copyFunction(text) {
        // setTimeout(setCopied(!copied), 1000);
        navigator.clipboard.writeText(text);
        document.getElementById("copy-alert").style.display = "block";
        setTimeout(() => { document.getElementById("copy-alert").style.display = "none" }, 2000);
        // alert("Copied text");

    }

    useEffect(() => {
        if (authData?.savedFunction.includes(func._id)) {
            setClicked(true)
        }
    }, [authData])
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <div class="alert alert-success text-center" id="copy-alert" style={{ position: 'fixed', bottom: 10, width: '30%', display: "none" }}>
                    Copied to clipboard
                </div>
            </div>
            <div class="text-black" style={{ padding: 6 }} id={`${func._id}`} >
                <div class="fluid-container" >
                    <div class="row">
                        <div class="col-1">
                            <h3>
                                <i style={{ color: "white" }} className={clicked == false ? "bi bi-heart" : "bi bi-heart-fill"}
                                    onClick={() => {
                                        if (role) {
                                            if (!clicked) {
                                                dispatch(savedFunction(func._id, authData?._id))
                                            } else {
                                                dispatch(unsavedFunction(func._id, authData?._id))
                                            }
                                            setClicked(!clicked);
                                        }

                                    }} />
                            </h3>
                        </div>
                        <div class="col-10" style={{ color: "white" }}>
                            <h5>{func.name}</h5>
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
                                {func.params}
                            </div>
                        </div>

                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>Description</h5>
                            <hr></hr>
                            <div >
                                {nl2br(func.description)}
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <div>
                                <div class="d-flex">
                                    <h5>Example</h5>
                                    <button type="button" class="btn btn-outline-secondary ms-auto" onClick={() => { copyFunction(func.example_question); }}>
                                        Copy
                                    </button>
                                </div>


                                <hr></hr>
                                <pre>
                                    <code>
                                        {func.example_question}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>Output</h5>
                            <hr></hr>
                            <div>
                                {nl2br(func.example_result)}
                            </div>
                        </div>
                        <div className="mt-2 border-bottom border-1 border-dark p-3">
                            <h5>More details</h5>
                            <hr></hr>
                            <a href={`${func.more_detail}`}>
                                {func.more_detail}
                            </a>
                        </div>

                        {role && role.includes('admin') && <div class="d-flex justify-content-end mt-2 p-2">
                            <EditFunction currFunction={func} category_id={category_id} />
                        </div>}


                    </div>

                </Collapse>
            </div>

        </div>
    )
}

