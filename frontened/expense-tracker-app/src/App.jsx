import { useState } from 'react'

import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import SignIn from './components/SignIn';
import Error from './components/Error';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OauthGoogle from './components/OauthGoogle';
import Expense from './components/Expense';
import Income from './components/Income';



function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement:<Error/>,
    children: [
      {
        path: "/login",
        element: <SignIn/>,
      },
      {
        path: "/register",
        element: <SignUp/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path:"/oauth-google",
        element:<OauthGoogle/>
      },
      {
        path:"/expense",
        element:<Expense/>
      },
      {
        path:"/income",
        element:<Income/>
      }
    ],
  },
]);

  return (<>
    <ToastContainer position="top-right" />
    <RouterProvider router={router} />
    </>
  )
}

export default App
