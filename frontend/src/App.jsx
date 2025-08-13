import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import ContactUs from './pages/ContactUs/ContactUs';
import Shop from './pages/Shop/Shop';
import Itemoverview from './pages/Itemoverview/Itemoverview';
import Cart from './pages/Cart/Cart';
import Adminpage from './pages/Adminpage/Adminpage';
import Order from './pages/Order/Order';
function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/home" element={<Home />} />
  <Route path='/services' element={<Services />} />
  <Route path='/contactus' element={<ContactUs />} />
  <Route path='/shop' element={<Shop />} />
  <Route path='/itemoverview/:productid' element={<Itemoverview />} />
  <Route path='/cart' element={<Cart />} />
  <Route path='/admin' element={<Adminpage />} />
  <Route path='/order' element={<Order />} />
  </Routes>
</BrowserRouter>

  )
  

}

export default App