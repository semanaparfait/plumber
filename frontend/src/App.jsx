import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Invoice from './pages/Invoice/Invoice';


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
const LazyProfile = lazy(()=> import('./pages/Profile/Profile'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='invoice' element={<Invoice />} />
          <Route path="/" element={<LazyHome />} />
          <Route path="/services" element={<LazyServices />} />
          <Route path="/contactus" element={<LazyContactUs />} />
          <Route path="/shop" element={<LazyShop />} />
          <Route path="/itemoverview/:productid" element={<ProtectedRoute><LazyItemoverview /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><LazyCart /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><LazyAdminpage /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><LazyOrder /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><LazyCheckout /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><LazyProfile /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
