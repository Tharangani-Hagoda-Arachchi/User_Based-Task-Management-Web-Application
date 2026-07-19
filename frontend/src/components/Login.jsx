import React from 'react'

const Login = ({ isOpen, onClose, openSignup }) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>LOGIN</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Login your account to organize and manage your daily tasks efficiently.
                </p>

                <form className='space-y-4'>

                    <input
                        type='email'
                        required
                        placeholder='Email'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <input
                        type='password'
                        required
                        placeholder='Password'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <button className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Login </button>

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