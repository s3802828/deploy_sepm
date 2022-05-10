import weblogo from '../../assets/weblogo.jpg';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../redux_sepm/actions/user';

export default function Login() {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const returnMessage = useSelector((state) => state.authReducer?.authData?.message)
    const logIn = (data) => {
        dispatch(login(data))
    };
    return (
        <div style={{ marginTop: "150px", marginBottom: 80 }}>
            <div class="d-flex align-items-center h-100">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-xl-4 col-lg-6 col-sm-8 col-10">
                            <div style={{ marginLeft: '35%' }}>
                                <img
                                    className='mb-4 mx-auto'
                                    src={weblogo}
                                    alt='Web Logo'
                                    width='45%'
                                    height='45%'
                                />
                            </div>
                            <h2 class="mb-3 mt-10 text-center">LOG IN</h2>

                            <form onSubmit={handleSubmit(logIn)}>

                                <div class="mb-3">
                                    <input id="username-or-email" name="username-or-email" type="text"
                                        placeholder="Username" className={`form-control ${errors.username ||
                                            returnMessage ===
                                            'Wrong username. Please try again!'
                                            ? 'is-invalid'
                                            : ''
                                            }`} {...register('username')}></input>
                                    <div className='invalid-feedback'>
                                        {returnMessage ===
                                            'Wrong username. Please try again!' &&
                                            returnMessage}{' '}
                                        {errors.username?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" name="Password" className={`form-control ${errors.password ||
                                            returnMessage ===
                                            'Wrong password. Please try again!'
                                            ? 'is-invalid'
                                            : ''
                                        }`} id="Password"
                                        placeholder="Password" {...register('password')}></input>
                                    <div className='invalid-feedback'>
                                        {returnMessage ===
                                            'Wrong password. Please try again!' &&
                                            returnMessage}{' '}
                                        {errors.password?.message}
                                    </div>
                                </div>
                                <div class="d-grid gap-2 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-primary btn-lg w-100">Log in</button>
                                </div>
                                <div class="row d-flex justify-content-between">
                                    <div class="col-lg-8 col-md-7 col-12 text-center text-md-start my-1">
                                        <a href="/client/signup">Don't have an account? Sign up</a>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}