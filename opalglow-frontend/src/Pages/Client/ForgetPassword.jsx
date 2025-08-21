import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const loadingToast = toast.loading("Sending OTP...");
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user/sendotp",
        { email }
      );
      toast.dismiss(loadingToast);
      toast.success(response.data.message || "OTP sent!");
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }

  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(e);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const changePasswordPromise = axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/user/changepassword",
      { email, otp, newPassword }
    );

    toast.promise(
      changePasswordPromise,
      {
        loading: 'Changing...',
        success: <b>Password changed successfully!</b>,
        error: <b>Could not change password.</b>,
      }
    );

    try {
      await changePasswordPromise;
      navigate("/login");
    } catch (err) {
      console.error(err);
      window.location.reload();
    }

  }

  return (
    <>
      {!emailSent ?
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3609620/pexels-photo-3609620.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-10"></div>

          {/* Form container */}
          <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">
            <h1 className="text-4xl font-semibold text-gray-900 text-center">Forgot Password</h1>
            <p className="mt-4 text-[14px] text-gray-700 tracking-wide drop-shadow-sm text-center">
              Enter your registered email to receive a OTP.
            </p>

            <form onSubmit={sendOtp} className="flex flex-col gap-3 h-full mt-7">
              <input
                type="email"
                placeholder="Email"
                className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-2 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex flex-col gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded text-gray-200 font-semibold transition duration-300 drop-shadow-lg cursor-pointer ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-400"
                    }`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>

              <div className="flex justify-center items-center gap-2 text-gray-700 text-xs mt-4">
                <p>
                  Remember your password?{" "}
                  <span className="text-blue-800 cursor-pointer">
                    <Link to="/login">Login here</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>

        :

        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3609620/pexels-photo-3609620.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-10"></div>

          {/* Form container */}
          <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">
            <h1 className="text-4xl font-semibold text-gray-900 text-center">Reset Password</h1>
            <p className="mt-4 text-[14px] text-gray-700 tracking-wide drop-shadow-sm text-center">
              Enter your received OTP to reset your password.
            </p>

            <form onSubmit={handleChangePassword} className="flex flex-col gap-3 h-full mt-7">
              <input
                type="text"
                placeholder="OTP"
                className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-2 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className='relative flex items-center mt-2'>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="placeholder:text-gray-500 placeholder:text-xs pl-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                </button>
              </div>
              <div className='relative flex items-center mt-2'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="placeholder:text-gray-500 placeholder:text-xs pl-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded text-gray-200 font-semibold transition duration-300 drop-shadow-lg cursor-pointer ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-400"
                    }`}
                >
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </div>

              <div className="flex justify-center items-center gap-2 text-gray-700 text-xs mt-4">
                <p>
                  Remember your password?{" "}
                  <span className="text-blue-800 cursor-pointer">
                    <Link to="/login">Login here</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>}
    </>
  );
};

export default ForgetPassword;