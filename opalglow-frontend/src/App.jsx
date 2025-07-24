import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import LoginPage from "./Pages/LoginPage"
import Adminpage from "./Pages/Adminpage"
import Products from "./Pages/Admin/Products"
import AddProduct from "./Pages/Admin/AddProduct"
import EditProduct from "./Pages/Admin/EditProduct"
import MediaUpload from "../Uitils/MediaUpload"

function App() {

  return (
    <>
    <BrowserRouter>

      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin" element={<Adminpage />}>
          <Route path="users" element={<h1>User</h1>} />          {/* Default: /admin */}
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct" element={<EditProduct />} />
          <Route path="input" element={<MediaUpload />} />
        </Route>

      </Routes>

    </BrowserRouter>
  </>
  )
}

export default App
