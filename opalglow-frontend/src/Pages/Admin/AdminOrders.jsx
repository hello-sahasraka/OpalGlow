import axios from 'axios';
import { useEffect, useState } from 'react'
import Loader from '../../Components/Loader';
import { SquareX } from 'lucide-react';
import AdminBillItemsCard from '../../Components/AdminBillItemsCard';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
  const [mediaIsDisplaying, setmMdiaIsDisplaying] = useState(null);

  useEffect(() => {
    if (loading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order/getorder", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(
        (respose) => {
          console.log(respose.data);
          setOrderList(respose.data);
          setLoading(false);

        }
      )
    }
  }, [loading])

  const changeOrderStatus = async (orderId, newStatus) => {
    toast.loading("Updating...")
    console.log(orderId);
    
    await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/updateorder/"+orderId, {
      status: newStatus
    }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(() => {
      toast.dismiss();
      toast.success(`Order status updated to ${newStatus} Successfully`);
      setModelIsDisplaying(false);
      setLoading(true);
    }).catch(() => {
      toast.dismiss();
      toast.error("Failed to update order status!")
    })
  }

  return (
    <div className='w-full h-full px-12 py-10'>
      {loading ?
        <Loader />
        :
        <div className='w-full h-full flex flex-col'>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Order Management
          </h1>
          <div className='overflow-x-auto bg-white rounded-xl shadow border-2 border-gray-200'>
            <table className="min-w-full text-xs text-left font-semibold">
              <thead className="text-xs text-gray-500 uppercase bg-gray-100 rounded-t-lg">
                <tr>
                  <th className="px-5 py-4">No</th>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4 w-[250px]">Address</th>
                  <th className="px-5 py-4">Total($ USD)</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {orderList.map((order, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => {
                      setmMdiaIsDisplaying(order);
                      setModelIsDisplaying(true);
                    }}
                  >
                    <td className="px-5 py-4">{index + 1}</td>
                    <td className="px-5 py-4 font-medium">{order.orderId}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded 
                      ${order.status == "Pending" && 'text-purple-600 bg-purple-200'}
                      ${order.status == "Complete" && 'text-green-600 bg-green-200'}
                      ${order.status == "Cancelled" && 'text-red-600 bg-red-200'}
                      ${order.status == "In progress" && 'text-blue-600 bg-blue-200'}`}>{order.status}</span>
                    </td>
                    <td className="px-5 py-4 max-w-sm truncate text-gray-600">
                      {order.name}
                    </td>
                    <td className="px-5 py-4 max-w-sm truncate">{order.address}</td>
                    <td className="px-5 py-4 text-red-600">${order.total.toFixed(2)}</td>
                    <td className="px-5 py-4">{new Date(order.date).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            modelIsDisplaying &&
            <div className='fixed w-full h-screen bg-gray-800/60 top-0 left-0 flex justify-center items-center'>
              <div className='w-[600px] h-4/5 max-h-4/5 p-4 shadow-md bg-white rounded-md'>
                <div className='flex justify-between border-b-1 border-gray-200 pb-4'>
                  <div>
                    <h1 className='text-gray-700 text-lg font-semibold'>#{mediaIsDisplaying.orderId}</h1>
                    <h4 className='text-gray-500 text-sm font-medium'>Order Details</h4>
                  </div>
                  <span className='cursor-pointer'>
                    <SquareX className=' text-gray-600 hover:scale-[1.05] hover:text-red-600 transform'
                      size={25} onClick={() => { setModelIsDisplaying(false) }} />
                  </span>
                </div>
                <div className='overflow-y-auto'>
                  <div className='py-4 flex flex-col gap-4'>
                    <h4 className='text-gray-500 text-sm font-medium'>Items</h4>
                    <div className='border-b-1 border-gray-200'>
                      {
                        mediaIsDisplaying.billItems.map((orderItem, index) => {
                          return <AdminBillItemsCard item={orderItem} key={index} />
                        })
                      }
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 border-b-1 border-gray-200 pb-4'>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Created at</h1>
                      <h1 className='text-sm text-gray-700 font-medium'>{new Date(mediaIsDisplaying.date).toDateString()}</h1>
                    </div>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Status</h1>
                      <h1 className='text-sm text-gray-700 font-medium'>
                        <select
                          className={`py-1 px-3 rounded
                            ${mediaIsDisplaying.status === 'Pending' && 'text-purple-600 bg-purple-200'}
                            ${mediaIsDisplaying.status === 'Complete' && 'text-green-600 bg-green-200'}
                            ${mediaIsDisplaying.status === 'Cancelled' && 'text-red-600 bg-red-200'}
                            ${mediaIsDisplaying.status === 'In progress' && 'text-blue-600 bg-blue-200'}
                          `}
                          value={mediaIsDisplaying.status}
                          onChange={(e) => {
                            console.log(e.target.value);
                            changeOrderStatus(mediaIsDisplaying.orderId, e.target.value)
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Complete">Complete</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="In progress">In progress</option>
                        </select>

                      </h1>
                    </div>
                  </div>
                  <div className='flex flex-col py-4 gap-4 border-b-1 border-gray-200 pb-4'>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Customer Name</h1>
                      <h1 className='text-sm text-gray-700 font-medium'>{mediaIsDisplaying.name}</h1>
                    </div>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Email</h1>
                      <h1 className='text-xs text-blue-500 font-medium cursor-pointer'>{mediaIsDisplaying.email}</h1>
                    </div>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Phone</h1>
                      <h1 className='text-sm text-gray-700 font-medium'>{mediaIsDisplaying.phone}</h1>
                    </div>
                    <div className='flex'>
                      <h1 className='w-3/5 text-sm text-gray-500 font-semibold'>Address</h1>
                      <h1 className='w-2/5 text-sm text-gray-700 font-medium'>{mediaIsDisplaying.address}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default AdminOrders