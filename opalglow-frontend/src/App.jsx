import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import LoginPage from "./Pages/LoginPage"
import Adminpage from "./Pages/Adminpage"
import Products from "./Pages/Admin/Products"
import AddProduct from "./Pages/Admin/AddProduct"
import EditProduct from "./Pages/Admin/EditProduct"
import MediaUpload from "../Uitils/MediaUpload"
import Register from "./Pages/Client/Register"
import Home from "./Pages/Home"
import ProductsPage from "./Pages/Client/ProductsPage"

function App() {

  return (
    <>
    <BrowserRouter>

      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<Adminpage />}>
          <Route path="users" element={<h1>User</h1>} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct" element={<EditProduct />} />
          <Route path="input" element={<MediaUpload />} />
        </Route>

        <Route path="/*" element={<Home />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="reviews" element={<h1>Reviews</h1>} />
          <Route path="aboutus" element={<h1>About Us</h1>} />
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Route>

      </Routes>

    </BrowserRouter>
  </>
  )
}

export default App
