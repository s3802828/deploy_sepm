import weblogo from '../../assets/weblogo.jpg';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { updateFunction, deleteFunction } from '../../redux_sepm/actions/functions'

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function EditFunction({ currFunction, category_id }) {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Name is required')
            .matches(
                /^(?!(),[ ]+$)[a-zA-Z0-9 .]*$/,
                'Name must only contain letters and space'
            ),
        params: Yup.string()
            .trim()
            .required('Params is required. If no param, please write None')
            .matches(
                /^(?!(),[ ]+$)[a-zA-Z .]*$/,
                'Params must only contain letters and space'
            ),
        description: Yup.string()
            .trim()
            .required('Description is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        example_question: Yup.string()
            .trim()
            .required('Question is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        example_result: Yup.string()
            .trim()
            .required('Result is required')
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ),
        more_detail: Yup.string()
            .trim()
            .matches(
                /^[a-zA-Z0-9 ?,.$'"-:+_()=;@!%*#?&\/\\(\r\n|\r|\n)]+$/,
                'Content cannot contain certain special characters. Be careful with apostrophe. The valid one is " \' "'
            ).nullable(true).transform(v => v === "" ? null : v),
        category_id: Yup.string().test(
            'value',
            'Category is required',
            (value) => {
                if (value === '0') {
                    return false;
                }
                return true;
            }
        ),

    })

    const {
        register,
        unregister,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        shouldUnregister: true,
        mode: 'onSubmit'
        
    });
    const [functionData, setFunctionData] = useState({
        _id: currFunction._id, name: currFunction.name, params: currFunction.params, description: currFunction.description,
        example_question: currFunction.example_question, example_result: currFunction.example_result, more_detail: currFunction.more_detail,
        category_id: currFunction.category_id
    });

    const topic_id = useParams()

    const dispatch = useDispatch();

    const topicList = useSelector((state) => state.categories);
    const languages = useSelector((state) => state.languages);


    const update = (e) => {
        // e.preventDefault();
        dispatch(updateFunction(functionData))
        window.location.replace(`/client/cheatsheet/${topic_id.language_id}`)
    }

    return (
        <div>
            <button type="button" class="btn btn-warning ml-auto"
                data-bs-toggle="modal" data-bs-target={`#editFunction${functionData._id}`}>
                <i class="bi bi-pencil-square"> Edit</i>
            </button>

            <div class="modal" id={`editFunction${functionData._id}`} aria-labelledby="editFunctionModel" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row mb-3">
                                    <h3 class="text-center">EDIT FUNCTION</h3>
                                </div>
                                <br />
                                <form class="row" onSubmit={handleSubmit(update)}>
                                    <input type='hidden' name="_id" lable="_id" value={functionData._id} />
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <input type="text" name="name" lable="name" value={functionData.name} className={`form-control ${errors.name
                                                ? 'is-invalid'
                                                : ''}`} {...register('name')}
                                                onChange={(e) => setFunctionData({ ...functionData, name: e.target.value })} class="form-control"
                                                placeholder="Enter Function Name..." aria-label="FunctionName" aria-describedby="basic-addon1" />
                                            <div className='invalid-feedback'>
                                                {errors.name?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <input type="text" name="params" lable="params" value={functionData.params} className={`form-control ${errors.params
                                                ? 'is-invalid'
                                                : ''}`} {...register('params')}
                                                onChange={(e) => setFunctionData({ ...functionData, params: e.target.value })} class="form-control"
                                                placeholder="Enter Function Parameter..." aria-label="NewFunction" aria-describedby="basic-addon1"></input>
                                            <div className='invalid-feedback'>
                                                {errors.params?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1 mb-3">
                                        <div hidden>
                                            Language:&nbsp;
                                            {languages.filter(lang => lang._id == topic_id.language_id).map(lang => {
                                                return (
                                                    lang.name
                                                )
                                            })}
                                        </div>
                                        <div class="col-lg-6 col-12 my-1">
                                            {/* Topic:&nbsp; */}
                                            <select id="InputTopic" name='topic' lable='topic'
                                                className={`form-select ${errors.category_id
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('category_id')}
                                                onChange={(e) => setFunctionData({ ...functionData, category_id: e.target.value })}>
                                                {/* <option value={topic_id} selected> {post_detail[0]?.categories[0].name} </option> */}
                                                {topicList.map(topic => {
                                                    return (
                                                        <option value={topic._id} selected={topic._id == functionData.category_id && 'selected'}>{topic.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <div className='invalid-feedback'>
                                                {errors.category_id?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <textarea class="form-control" name='description' lable='description' value={functionData.description}
                                                className={`form-control ${errors.description
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('description')}
                                                onChange={(e) => setFunctionData({ ...functionData, description: e.target.value })} placeholder="Description"
                                                id="FunctionDescription" rows="5"></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.description?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <textarea class="form-control" name='example_question' lable='example_question' value={functionData.example_question}
                                                className={`form-control ${errors.example_question
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('example_question')}
                                                onChange={(e) => setFunctionData({ ...functionData, example_question: e.target.value })} placeholder="Example Question" id="FunctionExample"
                                                rows="5"></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.example_question?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <textarea class="form-control" name='example_result' lable='example_result' value={functionData.example_result}
                                                className={`form-control ${errors.example_result
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('example_result')}
                                                onChange={(e) => setFunctionData({ ...functionData, example_result: e.target.value })}
                                                placeholder="Example Result" id="FunctionResult" rows="5"></textarea>
                                            <div className='invalid-feedback'>
                                                {errors.example_result?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ms-1">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" name='more_detail' lable='more_detail' value={functionData.more_detail}
                                                className={`form-control ${errors.more_detail
                                                    ? 'is-invalid'
                                                    : ''}`} {...register('more_detail')}
                                                onChange={(e) => setFunctionData({ ...functionData, more_detail: e.target.value })}
                                                placeholder="Please enter URL for more detail" aria-label="NewFunction" aria-describedby="basic-addon1"></input>
                                            <div className='invalid-feedback'>
                                                {errors.more_detail?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row ms-1">
                                        <div class="d-grid gap-2 d-flex justify-content-end">
                                            <button type="button" class="btn btn-danger" onClick={() => { dispatch(deleteFunction(functionData._id)); window.location.replace(`/client/cheatsheet/${topic_id.language_id}`) }}>Delete Function</button>
                                            <button type="submit" class="btn btn-success"
                                            onClick={() => {
                                                unregister('name', { keepDefaultValue: true, });
                                                unregister('params', { keepDefaultValue: true, });
                                                unregister('description', { keepDefaultValue: true, });
                                                unregister('example_question', { keepDefaultValue: true, });
                                                unregister('example_result', { keepDefaultValue: true, });
                                                unregister('more_detail', { keepDefaultValue: true, });
                                                unregister('category_id', { keepDefaultValue: true, });
                                            }}
                                            >Save changes</button>
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