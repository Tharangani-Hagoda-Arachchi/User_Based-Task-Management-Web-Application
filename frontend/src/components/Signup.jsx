import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { userSignup, clearMessages } from '../features/auth/authSlice.js';

import { toast } from 'react-toastify';

const Signup = ({ isOpen, onClose, openLogin }) => {

    const dispatch = useDispatch();

    //redux state
    const { loading, message, error } = useSelector(state => state.auth);

    //form state
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    //validaton error state
    const [errors, setErrors] = React.useState({})

    //input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //validate form
    const validateForm = () => {
        let validationErrors = {};

        //name validation
        if (!formData.name.trim()) {
            validationErrors.name = "Name is required"
        }
        else if (formData.name.trim().length < 3) {
            validationErrors.name = "Name must contain at least 3 characters"
        }

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required"
        }
        else if (!emailRegex.test(formData.email)) {
            validationErrors.email = "Please enter valid email address "
        }

        //password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.password) {
            validationErrors.password = "Password is required"
        }
        else if (!passwordRegex.test(formData.password)) {
            validationErrors.password = "Password must have 6+ characters, uppercase, lowercase, number and special character"
        }

        //confirm password validation
        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = "Please confirm your password"
        }
        else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Password do not match"
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    //signup form submission
    const handleSubmit = (e) => {
        e.preventDefault();


        if (validateForm()) {
            dispatch(
                userSignup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            );


        }
    };

    //open login after sucessfull signup
    useEffect(() => {
        if (message) {
            toast.success(message, { toastId: "reg-success" });
            dispatch(clearMessages());
            setTimeout(() => {
                onClose();
                openLogin();
            }, 2000)
        }
        if (error) {
            toast.error(error, { toastId: "reg-error" });
            dispatch(clearMessages());
        }
    }, [message, error, dispatch]);



    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>SIGN UP</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Create your account to organize and manage your daily tasks efficiently.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='Name'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.name &&
                        <p className='text-red-500 text-sm'>{errors.name}</p>
                    }

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

                    <input
                        type='password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder='Confirm Password'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.confirmPassword &&
                        <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
                    }

                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Sign Up </button>

                    <p className='text-center text-gray-600 mt-6'> Already have an account
                        <button type='button' onClick={() => {
                            onClose();
                            openLogin();
                        }}
                            className='ml-2 text-purple-600 font-semibold hover:underline'>
                            Login
                        </button>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup