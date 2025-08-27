import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import LoginPage from "./Pages/LoginPage"
import Adminpage from "./Pages/Adminpage"
import Products from "./Pages/Admin/Products"
import AddProduct from "./Pages/Admin/AddProduct"
import EditProduct from "./Pages/Admin/EditProduct"
import MediaUpload from "../Uitils/MediaUpload"
import Register from "./Pages/Client/Register"
import UserPage from "./Pages/UserPage"
import ProductsPage from "./Pages/Client/ProductsPage"
import ProductOverview from "./Pages/Client/ProductOverview"
import Cart from "./Pages/Client/Cart"
import PlaceOrder from "./Pages/Client/PlaceOrder"
import AdminOrders from "./Pages/Admin/AdminOrders"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Users from "./Pages/Admin/Users"
import NotFound from "./Pages/NotFound"
import AddUser from "./Pages/Admin/AddUser"
import { ConfirmDialogProvider } from "./Components/ConfirmDialogProvider"
import ForgetPassword from "./Pages/Client/forgetPassword"
import Home from "./Pages/Client/Home"
import Review from "./Pages/Client/Review"
import AboutUs from "./Pages/Client/AboutUs"

function App() {
  return (
    <GoogleOAuthProvider clientId="170780994031-8i19nui90rgeh3jbql9ga0pkh0b9es9s.apps.googleusercontent.com">
      <BrowserRouter>
        <ConfirmDialogProvider>
          <Toaster position="top-center" />
          <Routes>

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            {/* Admin routes */}
            <Route path="/admin" element={<Adminpage />}>
              <Route path="users" element={<Users />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="editproduct" element={<EditProduct />} />
              <Route path="input" element={<MediaUpload />} />
            </Route>

            {/* Public routes with Home as layout */}
            <Route path="/" element={<UserPage />}> 
              <Route index element={<Home />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductOverview />} />
              <Route path="reviews" element={<Review />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="cart" element={<Cart />} />
              <Route path="placeorder" element={<PlaceOrder />} />
              <Route path="*" element={<NotFound />} />
            </Route>

          </Routes>
        </ConfirmDialogProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
