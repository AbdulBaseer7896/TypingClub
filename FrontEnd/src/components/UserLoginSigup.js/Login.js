import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/userSlice'; // Update the import path as needed
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/slices/LoginSlice";

const Login = ({ openSignUp, setIsModelOpen }) => {
    console.log("this is the login function ")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
            setIsModelOpen(false);
        }
    }, [isLoggedIn, navigate, setIsModelOpen]);

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
        }
    }, [error]);

    const handleSubmit = (e) => {
        console.log("This is a form submission")
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages
        dispatch(loginUser({ email, password }));
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor="email">Email</label>
                    <input 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border' 
                        type="email" 
                        placeholder='Enter Email' 
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor="password">Password</label>
                    <input 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border' 
                        type="password" 
                        placeholder='Enter Password' 
                        minLength={8}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className='mb-4 text-red-600'>
                        {errorMessage}
                    </div>
                )}
                <div className='mb-4 flex items-center justify-between'>
                    <label className='inline-flex items-center'>
                        <input type="checkbox" className='form-checkbox' />
                        <span className='ml-2 text-gray-700'>Remember Me</span>
                    </label>
                    <button className='text-red-800'>Forgot Password?</button>
                </div>
                <div className='mb-4'>
                    <button type="submit" className='w-full bg-red-600 text-white py-2' disabled={status === 'loading'}>
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700'>Don't Have an Account?</span>
                <button className='text-red-800' onClick={openSignUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default Login;