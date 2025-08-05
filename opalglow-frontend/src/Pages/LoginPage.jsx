import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemenber] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            setLoading(true);
            console.log(res);
            toast.loading("Logging in...");

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                accessToken: res.access_token
            }).then((response) => {
                setLoading(false);
                console.log("Login Successful", response.data);
                toast.dismiss();
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;

                if (user.role === "user") {
                    navigate("/products");
                } else if (user.role === "admin") {
                    navigate("/admin/users");
                }
            })
        },

        onError: (err) => {
            console.log(err);
            setLoading(false);
        }
    });

    // Handle Input Change

    const handleEmail = e => {
        setEmail(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleRemember = e => {
        setRemenber(e.target.checked);
    }

    // LogIn Button

    const handlLogin = (e) => {
        toast.loading("Logging in...");
        setLoading(true);
        e.preventDefault();

        console.log(email);
        console.log(password);

        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', {

            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login Successful", response.data);
                toast.dismiss();
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;

                if (user.role === "user") {
                    navigate("/admin/users");
                } else if (user.role === "admin") {
                    navigate("/admin/products");
                }

            }).catch(
                (error) => {
                    console.log("Login Failed", error.response.data);
                    toast.dismiss();
                    toast.error(error.response.data.message || "Login Failed");
                }
            )

    }


    return (
        <div className='min-h-screen flex items-center justify-center'
            style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3609620/pexels-photo-3609620.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black opacity-10"></div>

            {/* Form container */}
            <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">

                <h1 className='text-4xl font-semibold text-gray-900 text-center'>LogIn</h1>
                <p className='mt-4 text-[14px] text-gray-700 tracking-wide drop-shadow-sm text-center'>Welcome to Opal Glow Comsmetics</p>

                <div className="flex flex-col gap-3 h-full mt-7 ">
                    <input
                        type="text"
                        placeholder='email'
                        className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-2 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                        id='email'
                        onChange={handleEmail}
                        value={email} />

                    <input
                        type="password"
                        placeholder='password'
                        className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-2 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                        id='password'
                        onChange={handlePassword}
                        value={password} />

                    <div className='flex justify-between text-xs'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                className='size-3'
                                checked={remember}
                                onChange={handleRemember} />
                            <label className='w-full text-gray-700'>Remember me</label>
                        </div>
                        <a href="#" className='text-gray-700'>Forget your password</a>
                    </div>

                    <div className='flex flex-col gap-4 mt-8'>
                        <button type='submit' onClick={handlLogin} className='w-full bg-black py-2 rounded text-gray-200 font-semibold hover:bg-gray-400 transition duration-300 drop-shadow-lg cursor-pointer'>Login</button>
                        <button type='submit' onClick={loginWithGoogle}
                            className='w-full bg-black py-2 rounded text-gray-200 font-semibold hover:bg-gray-400 transition duration-300 drop-shadow-lg cursor-pointer flex gap-2 justify-center'><FcGoogle size={24} /> Login with Google</button>
                    </div>

                    <div className="flex justify-center items-center gap-2 text-gray-700 text-xs">
                        <p>
                            Don't have an account yet?
                            <span className='text-blue-800 cursor-pointer'><Link to="/register"> Sign in!</Link></span>
                        </p>
                    </div>

                </div>
            </div>
            {/* <img src="../public/opal-logo.png" alt="Logo" className='h-[80px] w-auto mt-10 drop-shadow-2xl absolute right-[80px] top-[10px]' /> */}
        </div>
    )
}

export default LoginPage