// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'

// function CheckAuth ({ isAuthenticated, user, children }) {
//   const location = useLocation()
//   console.log(location.pathname,isAuthenticated);
//   if (
// 		!isAuthenticated &&
// 		!(
// 			location.pathname.includes('/login') ||
// 			location.pathname.includes('/register')
// 		)
// 	) {
//     return <Navigate to={'/auth/login'} />
//   }
//   if (
// 		isAuthenticated &&
// 		(
//         location.pathname.includes('/login') ||
// 		    location.pathname.includes('/register'))
// 	) {
//          if(user?.role==='admin'){
//             return <Navigate to={'/admin/dashboard'} />
//          }
//          else
//          {
//             return <Navigate to={'/shop/home'} />
//          }
//   }
//   if(isAuthenticated && user?.role !=='admin' && location.pathname.includes('admin')){
//      return <Navigate to="/unauth-page" />
//   }
//   if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')){
//     return <Navigate to={"/admin/dashboard"} />;
//   }
//   return <>
//     {children}
//   </>
// }

// export default CheckAuth



import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log(location.pathname, isAuthenticated);

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated && !(
    location.pathname.includes('/login') ||
    location.pathname.includes('/register')
  )) {
    return <Navigate to={'/auth/login'} />;
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (
    location.pathname.includes('/login') ||
    location.pathname.includes('/register'))
  ) {
    return user?.role === 'admin' ? (
      <Navigate to={'/admin/dashboard'} />
    ) : (
      <Navigate to={'/shop/home'} />
    );
  }

  // Prevent admin access to non-admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
    return <Navigate to="/unauth-page" />;
  }

  // Redirect normal users from shop to admin dashboard
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>; // Render children if no redirection is needed
}

export default CheckAuth;
