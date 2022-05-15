import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { changePassword } from '../../redux_sepm/actions/user_update';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function ChangePass() {

    const dispatch = useDispatch()
    const returnMessage = useSelector((state) => state.user_update[0]?.message);
    const { authData } = useSelector((state) => state.authReducer)

    const validationSchema = Yup.object().shape({

        oldPassword: Yup.string().required('Username is required'),
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
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const changepass = (data) => {
        let passwordInput = {
            oldPassword: data.oldPassword,
            password: data.password,
        };

        dispatch(changePassword(authData._id, passwordInput));
        
    }


    return (
        <div style={{ marginTop: "150px", marginBottom: 80 }}>
            <div class="d-flex align-items-center h-100">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-xl-4 col-lg-6 col-sm-8 col-10">

                            <h2 class="mb-3 mt-10 text-center" style={{color: "#ffc13b"}}>CHANGE PASSWORD</h2>

                            <form onSubmit={handleSubmit(changepass)}>

                                <div class="mb-3">
                                    <input type="password" name="oldPassword" className={`form-control ${errors.oldPassword ||
                                        returnMessage ===
                                        'Wrong password. Please try again!'
                                        ? 'is-invalid'
                                        : ''
                                        }`} id="Password"
                                        placeholder="Current Password" {...register('oldPassword')}></input>
                                    <div className='invalid-feedback'>
                                        {returnMessage ===
                                            'Wrong password. Please try again!' &&
                                            returnMessage}{' '}
                                        {errors.password?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''
                                        }`} id="Password"
                                        placeholder="New Password" {...register('password')}></input>
                                    <div className='invalid-feedback'>
                                        {errors.password?.message}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword
                                        ? 'is-invalid'
                                        : ''
                                        }`} id="ConfirmPassword"
                                        placeholder="Confirm New Password" {...register('confirmPassword')}></input>
                                    <div className='invalid-feedback'>
                                        {errors.confirmPassword?.message}
                                    </div>
                                </div>
                                <div class="d-grid gap-2 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-warning btn-lg w-100">CHANGE PASSWORD</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}