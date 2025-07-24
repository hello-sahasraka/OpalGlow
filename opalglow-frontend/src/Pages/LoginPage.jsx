import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemenber] = useState(false);
    const navigate = useNavigate();

    // Handle Input Change

    const handleEmail= e=> {
        setEmail(e.target.value);  
    }
    const handlePassword= e=> {
        setPassword(e.target.value);   
    }
    const handleRemember= e=> {
        setRemenber(e.target.checked);
    }

    // LogIn Button

    const handlLogin = (e) => {
        e.preventDefault(); 

        console.log(email);
        console.log(password); 
        
        axios.post(import.meta.env.VITE_BACKEND_URL+'/api/user/login', {

            email: email,
            password: password
        }).then(
            (response)=> {
                console.log("Login Successful", response.data); 
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;

                if (user.role === "user") {
                    navigate("/admin/users");
                } else if (user.role === "admin") {
                    navigate("/admin/products"); 
                }

            }).catch(
                (error)=> {
                    console.log("Login Failed", error.response.data); 
                    toast.error(error.response.data.message || "Login Failed");
                }
            )
        
    }


  return (
    <div className='bg-[url(../public/bg-image_01.jpg)] h-screen w-full bg-cover bg-center flex items-center gap-100'>
        <div className="w-[520px] h-9/10 bg-white/60 backdrop-blur-[10px] rounded-2xl outline-2 outline-gray-600 outline-offset-[-10px] flex flex-col items-center ml-50">
            <h1 className='text-5xl text-black-800 font-boldr mt-15 drop-shadow-lg tracking-tighter'>Login</h1>
            <p className='mt-4 text-[14px] text-gray-700 tracking-wide drop-shadow-sm italic'>Welcome to Opal Glow Comsmetics</p>

            <div className="flex flex-col gap-5 h-full mt-20 ">
                <div className='flex flex-col justify-right'>
                <label for="email" className='pr-4 text-sm text-gray-600 mb-2 font-medium px-3'>E-mail</label>
                <input 
                type="text" 
                placeholder='email' 
                className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[400px] h-[40px]" 
                id='email'
                onChange={handleEmail}
                value={email} />
                </div>
                    <div className='flex flex-col justify-right'>
                        <label for="password" className='pr-4 text-sm text-gray-600 mb-2 font-medium px-3'>Password</label>
                        <input 
                        type="password" 
                        placeholder='password' 
                        className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[400px] h-[40px]" 
                        id='password'
                        onChange={handlePassword}
                        value={password} />
                    </div>
                
                <div className='flex justify-between text-xs'>
                    <div className='flex items-center gap-2'>
                        <input 
                        type="checkbox" 
                        className='size-3'
                        checked={remember}
                        onChange={handleRemember}/>
                        <label className='w-full text-gray-700'>Remember me</label>
                    </div>
                    <a href="#" className='text-gray-700'>Forget your password</a>
                </div>

                <button type='submit' onClick={handlLogin} className='bg-black rounded-md w-[400px] h-[40px] text-gray-200 font-semibold mt-8 hover:bg-white hover:text-black transition duration-300 drop-shadow-lg cursor-pointer'>Login</button>

            </div>
        </div>
        <img src="../public/opal-logo.png" alt="Logo" className='h-[80px] w-auto mt-10 drop-shadow-2xl absolute right-[80px] top-[10px]' />
    </div>
  )
}

export default LoginPage