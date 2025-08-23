import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";


const UserData = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/currentuser", {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).then((response) => {
                setUser(response.data);
            }).catch((e) => {
                console.log(e);
                setUser(null);
            })
        }
    }, [token]);

    return (
        <div>
            {!user ?
                <div className="w-full h-full flex justify-center items-center gap-4">
                    <Link to="/login" className="bg-rose-600 text-white rounded-full px-4 py-2 hover:bg-rose-700 transition-all duration-200 text-md">Login</Link>
                    <Link to="/register" className="bg-rose-600 text-white rounded-full px-4 py-2 hover:bg-rose-700 transition-all duration-200 shadow-md text-md">Register</Link>
                </div>
                :
                <div className="h-full flex justify-center items-center">
                    <button
                        className="bg-rose-600 text-white rounded-full px-4 py-2 hover:bg-rose-800 transition-all duration-200 shadow-md text-md"
                        onClick={() => {
                            setUser(null);
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                    >Logout</button>
                </div>}
        </div>
    )
}

export default UserData