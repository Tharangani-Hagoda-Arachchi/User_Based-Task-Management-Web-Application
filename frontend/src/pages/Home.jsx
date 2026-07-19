import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Signup from '../components/Signup.jsx';
import Login from '../components/Login.jsx';

const Home = () => {
    const [showSignup, setShowSignup] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar openSignup={() => setShowSignup(true)} openLogin={() => setShowLogin(true)} />
            <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} openLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
            }} />
            <Login isOpen={showLogin} onClose={() => setShowLogin(false)} openSignup={() =>{
                setShowLogin(false);
                setShowSignup(true);
            }} />
        </div>
    )
}

export default Home