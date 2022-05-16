import weblogo from '../../assets/weblogo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signUp } from '../../redux_sepm/actions/user';


export default function Signup() {
    const dispatch = useDispatch()
    const returnMessage = useSelector((state) => state.authReducer?.authData?.message)
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Name is required')
            .max(50, 'Name must not exceed 50 characters')
            .matches(
                /^(?![ ]+$)[a-zA-Z .]*$/,
                'Name must only contain letters and space'
            ),
        username: Yup.string()
            .trim()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(15, 'Username must not exceed 15 characters')
            .matches(
                /^[a-zA-Z0-9_]+$/,
                'Username must only contain letters, numbers, or "_"'
            ),
        email: Yup.string()
            .trim()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .trim()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
                'Password must contain at least one letter, one number, and one special character'
            ),
        confirmPassword: Yup.string()
            .trim()
            .required('Confirm Password is required')
            .oneOf(
                [Yup.ref('password'), null],
                'Confirm Password does not match'
            ),
    });
    const signup = (data) => {
        let registrant = {
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
        };
        dispatch(signUp(registrant));
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    return (
        <div style={{ marginTop: "110px", marginBottom: 80 }}>
            <div class="d-flex align-items-center h-100">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-xl-4 col-lg-6 col-sm-8 col-10">
                            <div style={{ marginLeft: '35%' }}>
                                <img className='mb-4 mx-auto border border-warning' src={weblogo} alt='Web Logo' width='45%' height='45%' />
                            </div>
                            <h2 class="mb-3 mt-10 text-center" style={{color: "#ffc13b"}}>SIGN UP</h2>
                            <form onSubmit={handleSubmit(signup)}>
                                <div class="mb-3">
                                    <input type="name" name="Name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="Name" placeholder="Name" {...register('name')}></input>
                                    <div className='invalid-feedback'>
                                        {errors.name?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="username" name="Username" className={`form-control ${errors.username || returnMessage ===
                                        'Username is already existed.' ? 'is-invalid' : ''
                                        }`} id="Username" placeholder="Username" {...register('username')}></input>
                                    <div className='invalid-feedback'>
                                        {returnMessage ===
                                            'Username is already existed.' &&
                                            returnMessage}{' '}
                                        {errors.username?.message}
                                    </div>

                                </div>
                                <div class="mb-3">
                                    <input type="email" name="EmailAddress" className={`form-control ${errors.email ||
                                        returnMessage ===
                                        'Email is already existed.'
                                        ? 'is-invalid'
                                        : ''
                                        }`} id="EmailAddress"
                                        placeholder="Email" {...register('email')}></input>
                                    <div className='invalid-feedback'>
                                        {returnMessage ===
                                            'Email is already existed.' &&
                                            returnMessage}{' '}
                                        {errors.email?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" name="Password" className={`form-control ${errors.password ? 'is-invalid' : ''
                                        }`} id="Password"
                                        placeholder="Password" {...register('password')}></input>
                                    <div className='invalid-feedback'>
                                        {errors.password?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" name="ConfirmPassword" className={`form-control ${errors.confirmPassword
                                        ? 'is-invalid'
                                        : ''
                                        }`} id="ConfirmPassword"
                                        placeholder="Confirm Password" {...register('confirmPassword')}></input>
                                    <div className='invalid-feedback'>
                                        {errors.confirmPassword?.message}
                                    </div>
                                </div>
                                <div class="d-grid gap-2 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-warning btn-lg w-100">Sign up</button>
                                </div>
                                <div class="row d-flex justify-content-center">
                                    <a href="/client/login" class="text-center" style={{color: "#ffc13b"}}>Already have an account? Log in</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}