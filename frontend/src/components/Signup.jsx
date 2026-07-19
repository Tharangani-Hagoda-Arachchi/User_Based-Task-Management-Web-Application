import React from 'react'

const Signup = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>SIGN UP</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Create your account to organize and manage your daily tasks efficiently.
                </p>

                <form className='space-y-4'>

                    <input
                        type='text'
                        required
                        placeholder='Name'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

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

                    <input
                        type='password'
                        required
                        placeholder='Confirm Password'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <button className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Sign Up </button>

                    <p className='text-center text-gray-600 mt-6'> Already have an account
                        <buuton type='button' onClick={() => {
                            onClose();
                            openLogin();
                        }}
                            className='ml-2 text-purple-600 font-semibold hover:underline'>
                            Login
                        </buuton>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup