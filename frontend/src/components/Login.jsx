import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearMessages } from '../features/auth/authSlice.js';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ isOpen, onClose, openSignup }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //redux state
    const { loading, message, error } = useSelector(state => state.auth);

    //form state
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    //validaton error state
    const [errors, setErrors] = React.useState({})

    //input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //form validation
    const validateForm = () => {
        let validationErrors = {};

        //email validation
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required"
        }

        //password validation
        if (!formData.password) {
            validationErrors.password = "Password is required"
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    //login form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(
                userLogin({
                    email: formData.email,
                    password: formData.password,
                })
            );

        }
    };

    //open dashboard sucessfull login
    useEffect(() => {
        if (message) {
            toast.success(message, { toastId: "auth-success" });
            dispatch(clearMessages());
            navigate("/dashboard")
        }
        if (error) {
            toast.error(error, { toastId: "auth-error" });
            dispatch(clearMessages());
        }
    }, [message, error, dispatch]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>LOGIN</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Login your account to organize and manage your daily tasks efficiently.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>

                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder='Email'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.email &&
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                    }

                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder='Password'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.password &&
                        <p className='text-red-500 text-sm'>{errors.password}</p>
                    }

                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Login </button>

                    <p className='text-center text-gray-600 mt-6'> Create new account
                        <button type='button' onClick={() => {
                            onClose();
                            openSignup();
                        }}
                            className='ml-2 text-purple-600 font-semibold hover:underline'>
                            Sign up
                        </button>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login