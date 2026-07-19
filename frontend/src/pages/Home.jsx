import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Signup from '../components/Signup.jsx';

const Home = () => {
    const [showSignup, setShowSignup] = React.useState(false);
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar openSignup={() => setShowSignup(true)} />
            <Signup isOpen={showSignup} onClose={() => setShowSignup(false)}/>
        </div>
    )
}

export default Home