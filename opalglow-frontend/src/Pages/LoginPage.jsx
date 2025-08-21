import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeClosed } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemenber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Google login handler
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        console.log(res);
        toast.loading("Logging in...");
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/user/google",
          { accessToken: res.access_token }
        );

        console.log("Login Successful", response.data);
        toast.dismiss();
        toast.success("Login Successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        if (user.role === "user") navigate("/products");
        else if (user.role === "admin") navigate("/admin/users");
      } catch (err) {
        console.log(err);
        toast.dismiss();
        toast.error("Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.log(err);
      toast.dismiss();
      toast.error("Google login failed");
      setLoading(false);
    }
  });

  const handleGoogleLogin = () => {
    if (loading) return;
    setLoading(true);
    loginWithGoogle();
  };

  // Input handlers
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRemember = (e) => setRemenber(e.target.checked);

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    toast.loading("Logging in...");

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', {
        email,
        password
      });

      console.log("Login Successful", response.data);
      toast.dismiss();
      toast.success("Login Successful");
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      if (user.role === "user") navigate("/products");
      else if (user.role === "admin") navigate("/admin/users");
    } catch (err) {
      console.log("Login Failed", err.response?.data);
      toast.dismiss();
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/3609620/pexels-photo-3609620.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">
        <h1 className='text-4xl font-semibold text-gray-900 text-center'>LogIn</h1>
        <p className='mt-4 text-[14px] text-gray-700 tracking-wide drop-shadow-sm text-center'>
          Welcome to Opal Glow Cosmetics
        </p>

        <form className="flex flex-col gap-3 h-full mt-7">
          <input
            type="text"
            placeholder='email'
            className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-2 border border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
            value={email}
            onChange={handleEmail}
          />

          <div className='flex items-center relative mt-2'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='password'
              className="placeholder:text-gray-500 placeholder:text-xs pl-3 border border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
              value={password}
              onChange={handlePassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
            </button>
          </div>

          <div className='flex justify-between text-xs'>
            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={remember}
                onChange={handleRemember}
              />
              <label className='text-gray-700'>Remember me</label>
            </div>
            <Link to="/forgetpassword" className='text-blue-800 hover:underline'>Forget Password?</Link>
          </div>

          <div className='flex flex-col gap-4 mt-8'>
            <button
              type='button'
              disabled={loading}
              onClick={handleLogin}
              className={`w-full py-2 rounded text-gray-200 font-semibold drop-shadow-lg transition duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-400'
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <button
              type='button'
              disabled={loading}
              onClick={handleGoogleLogin}
              className={`w-full py-2 rounded text-gray-200 font-semibold flex gap-2 justify-center drop-shadow-lg transition duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-400'
              }`}
            >
              {loading ? "Loading..." : <><FcGoogle size={24} /> Login with Google</>}
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 text-gray-700 text-xs mt-4">
            <p>
              Don't have an account yet?
              <span className='text-blue-800 cursor-pointer'><Link to="/register"> Sign up!</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
