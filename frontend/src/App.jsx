import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/Login'
import AuthRegsiter from './pages/auth/Register'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/featurs'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/checkAuth'
import Unauth from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import { Skeleton } from "@/components/ui/skeleton"

const App = () => {

  const {user,isAuthenticated,isLoading } = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());  // Invoke the action creator
  }, [dispatch]);
  
if(isLoading)
{
  return <div><Skeleton className="w-full bg-gray-600 h-[770px] " />
</div>
}
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* Common components */}
      <Routes>
        <Route path='/'>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegsiter />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/unauth-page'element={<Unauth/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
