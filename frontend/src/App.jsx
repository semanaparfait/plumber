import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader'; // your correct path



// Lazy load pages
const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyServices = lazy(() => import('./pages/Services/Services'));
const LazyContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));
const LazyShop = lazy(() => import('./pages/Shop/Shop'));
const LazyItemoverview = lazy(() => import('./pages/Itemoverview/Itemoverview'));
const LazyCart = lazy(() => import('./pages/Cart/Cart'));
const LazyAdminpage = lazy(() => import('./pages/Adminpage/Adminpage'));
const LazyOrder = lazy(() => import('./pages/Order/Order'));
const LazyCheckout = lazy(() => import('./pages/Checkoutpage/Checkout'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path="/" element={<LazyHome />} />
          <Route path="/services" element={<LazyServices />} />
          <Route path="/contactus" element={<LazyContactUs />} />
          <Route path="/shop" element={<LazyShop />} />
          <Route path="/itemoverview/:productid" element={<LazyItemoverview />} />
          <Route path="/cart" element={<LazyCart />} />
          <Route path="/admin" element={<LazyAdminpage />} />
          <Route path="/order" element={<LazyOrder />} />
          <Route path='/checkout' element={<LazyCheckout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
