import weblogo from '../../assets/weblogo.jpg';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { addFunction } from '../../redux_sepm/actions/functions'
import { getTopicFromLang } from '../../redux_sepm/actions/language';
import { getLanguage } from "../../redux_sepm/actions/language.js"

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function AddFunction() {

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
                /^[a-zA-Z0-9 ?,.$'"-:+_();@!%*#?&\/\\(\r\n|\r|\n)]+$/,
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
        resolver: yupResolver(validationSchema)
    });

    const [functionData, setFunctionData] = useState({
        name: '', params: '', description: '', example_question: '', example_result: '', more_detail: '', category_id: ''
    });

    const topic_id = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        if (topic_id != undefined) {
            dispatch(getTopicFromLang(topic_id.language_id));
            dispatch(getLanguage());
        }

    }, [dispatch])

    const topicList = useSelector((state) => state.categories);
    const languages = useSelector((state) => state.languages);


    const add = (e) => {
        // e.preventDefault();
        console.log(functionData)
        dispatch(addFunction(functionData))
        window.location.replace(`/client/cheatsheet/${topic_id.language_id}`)
    }

    return (
        <div style={{ marginTop: 80, marginBottom: 80 }}>
            <div class="row mt-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <div class="row mb-3">
                                <h3 class="text-center">ADD NEW FUNCTION</h3>
                            </div>
                            <form class="row mb-5" onSubmit={handleSubmit(add)}>
                                <div class="row ms-1">
                                    <div class="input-group mb-3">
                                        <input type="text" name="name" label="name"
                                            className={`form-control ${errors.name
                                                ? 'is-invalid'
                                                : ''}`} {...register('name')}
                                            onChange={(e) => setFunctionData({ ...functionData, name: e.target.value })}
                                            placeholder="Enter Function Name..." aria-label="name" aria-describedby="basic-addon1"></input>
                                        <div className='invalid-feedback'>
                                            {errors.name?.message}
                                        </div>
                                    </div>
                                </div>
                                <div class="row ms-1">
                                    <div class="input-group mb-3">
                                        <input type="text" name="params" label="params"
                                            className={`form-control ${errors.params
                                                ? 'is-invalid'
                                                : ''}`} {...register('params')}
                                            onChange={(e) => setFunctionData({ ...functionData, params: e.target.value })}
                                            placeholder="Enter Function Parameter..." aria-label="NewFunction" aria-describedby="basic-addon1"></input>
                                        <div className='invalid-feedback'>
                                            {errors.params?.message}
                                        </div>
                                    </div>
                                </div>
                                <div class="row ms-1 mb-3">
                                    <div class="col-lg-6 col-12 my-1">
                                        Language:&nbsp;
                                        {languages.filter(lang => lang._id == topic_id.language_id).map(lang => {
                                            return (
                                                lang.name
                                            )
                                        })}
                                    </div>
                                    <div class="col-lg-6 col-12 my-1">
                                        {/* Topic:&nbsp; */}
                                        <select id="InputTopic" name='topic' label='topic'
                                            className={`form-select ${errors.category_id
                                                ? 'is-invalid'
                                                : ''}`} {...register('category_id')}
                                            onChange={(e) => setFunctionData({ ...functionData, category_id: e.target.value })}>
                                            <option value="0" selected>Choose topic</option>
                                            {topicList.map(topic => {
                                                return (
                                                    <option value={topic._id}>{topic.name}</option>
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
                                        <textarea name='description' label='description' //defaultValue={functionData.description}
                                            className={`form-control ${errors.description
                                                ? 'is-invalid'
                                                : ''}`} {...register('description')}
                                            onChange={(e) => setFunctionData({ ...functionData, description: e.target.value }) } placeholder="Description"
                                            id="FunctionDescription" rows="5"></textarea>
                                        <div className='invalid-feedback'>
                                            {errors.description?.message}
                                        </div>
                                    </div>
                                </div>
                                <div class="row ms-1">
                                    <div class="input-group mb-3">
                                        <textarea name='example_question' label='example_question' //defaultValue={functionData.example_question}
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
                                        <textarea name='example_result' label='example_result' //defaultValue={functionData.example_result} 
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
                                        <input type="text" name='more_detail' label='more_detail' //defaultValue={functionData.more_detail}
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
                                <div class="row ms-1">
                                    <div class="d-grid gap-2 d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary"
                                        // onClick={() => {
                                        //     unregister('name', { keepDefaultValue: true, });
                                        //     unregister('params', { keepDefaultValue: true, });
                                        //     unregister('description', { keepDefaultValue: true, });
                                        //     unregister('example_question', { keepDefaultValue: true, });
                                        //     unregister('example_result', { keepDefaultValue: true, });
                                        //     unregister('more_detail', { keepDefaultValue: true, });
                                        //     unregister('category_id', { keepDefaultValue: true, });
                                        // }}
                                        >Add Function</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}