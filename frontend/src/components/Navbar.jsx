import React from 'react'

const Navbar = ({openSignup, openLogin}) => {
    return (
        <nav className='bg-white shadow-md border-b border-gray-200r '>
            <div className='max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between'>
                <h1 className='text-1xl font-bold text-purple-600'>TaskRabbit</h1>

                <div className='flex gap-4 mt-4 md:mt-4'>
                    <button onClick={openLogin} className='bg-purple-600 hover:bg-purple-900 text-white px-6 py-2 rounded-lg transition duration-300'>
                        Login
                    </button>

                    <button onClick={openSignup} className='border-2 border-purple-600 text-purple-600 hover:bg-purple-900 hover:text-white px-6 py-2 rounded-lg transition duration-300'>
                        Sign Up
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar