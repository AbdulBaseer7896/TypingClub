import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { logout } from "../../redux/slices/LoginSlice";
// import loginSlice from 'redux/slices/loginSlice';
import { logout } from "../redux/slices/LoginSlice";
import Model from "./UserLoginSigup.js/Model";
import Login from "./UserLoginSigup.js/Login";
import Register from "./UserLoginSigup.js/Register";


// Link
const Navbar = () => {


    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openSignUp = () => {
        setIsLogin(false);
        setIsModelOpen(true);
    };

    const openLogin = () => {
        setIsLogin(true);
        setIsModelOpen(true);
    };

    // Handle user logout
    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/'); // Redirect to the homepage or any other page after logout
    };
    const {  isLoggedIn } = useSelector(state => state.user || { email: '', isLoggedIn: false });


    return (
            <nav className='bg-[#0d1110] shadow-md '>
                <div className='container mx-auto px-3 md:px-16 lg:px-24 py-5 flex justify-between items-center'>
                    {/* Logo on the left */}
                    <div className='text-lg font-bold text-[#c59438]'>
                        <Link to='/'>Moiz-Typing</Link>
                    </div>

                    {/* Navigation links centered */}
                    <div className='flex-grow flex justify-center'>
                        <div className='flex items-center space-x-10 text-sm font-bold text-[#c59438]'>
                            <Link to={"/"} className='hover:underline'>Home</Link>
                            <Link to={"/Ranking"} className='hover:underline'>Ranking</Link>
                            <Link to={"/"} className='hover:underline'>Contact</Link>
                            <Link to={"/"} className='hover:underline'>About</Link>
                            {/* <Link to={"/"} className='hover:underline'>Logout</Link> */}
                            {isLoggedIn ? (
                        <button className='hidden md:block' onClick={handleLogout}>
                            LogOut
                        </button>
                    ) : (
                        <button className='hidden md:block' onClick={() => setIsModelOpen(true)}>
                            Login | Register
                        </button>
                    )}
                        </div>
                    </div>
                </div>
                <hr className="bg-[#555555] border-0 h-1"/>
                <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
                {isLogin ? (
                    <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} />
                ) : (
                    <Register openLogin={openLogin} />
                )}
            </Model>
            </nav>
    );
};

export default Navbar;