import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { UserMinus, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useConfirmDialog } from '../../Components/ConfirmDialogProvider';

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const confirmDialog = useConfirmDialog();


    useEffect(() => {
        if (loading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/getuser", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    setUserList(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [loading]);

    const handleDelete = (email) => {

        confirmDialog("Are you sure you want to delete this User?", async () => {
            toast.loading("Deleting...");

            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss();
                toast.error("Please login first");
                return;
            }

            try {
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteuser/${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.dismiss();
                toast.success("User deleted");
                setLoading(true);
            } catch (error) {
                console.error(error);
                toast.dismiss();
                toast.error("Failed to delete user");
            }
        })



    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
    }

    if (userList.length === 0) {
        return <div className="p-6 text-center text-gray-500">No users found</div>;
    }

    return (
        <div className="w-full h-full bg-gray-50 px-12 py-10 relative">

            <Link
                to="/admin/adduser"
                className="fixed bottom-6 right-6 bg-blue-600 hover:scale-115 text-white p-3 rounded-full shadow-lg transition"
                title="Add New Product"
            >
                <UserPlus size={26} />
            </Link>

            <div className='w-full h-full flex flex-col'>
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    User Management
                </h1>

                <div className="overflow-x-auto font-semibold bg-white rounded-xl shadow border border-gray-200">
                    <table className="min-w-full text-xs text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100 rounded-t-lg">
                            <tr>
                                <th className="px-5 py-4">Full Name</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Phone</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                            {userList.map((user, index) => (
                                <tr
                                    key={user._id || index}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-5 py-4">{user.firstName} {user.secondName}</td>
                                    <td className="px-5 py-4">{user.role == "user" ? <span className='text-blue-600 bg-blue-200 rounded px-3 py-1'>User</span> : <span className='text-green-600 bg-green-200 rounded px-3 py-1'>Admin</span>}</td>
                                    <td className="px-5 py-4 text-gray-700">{user.email}</td>
                                    <td className="px-5 py-4">{user.phone || <span className="italic text-gray-400">Empty</span>}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleDelete(user.email)}
                                                title="Delete User"
                                                className="text-red-500 border border-red-600 bg-red-100 rounded-full p-1 hover:text-red-700 transition cursor-pointer"
                                            >
                                                <UserMinus size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
};

export default Users;
