import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { persistor, store } from './util/appStore.js';
import { PersistGate } from 'redux-persist/integration/react';

import Error from './component/error'
import Home from './component/home'
import Auth from './component/auth'
import DoctorAuth from './component/doctorAuth/index.jsx'
import ProtectedRoute from './component/protectedRoute/index.jsx'
import AddPatient from './component/addPatient/index.jsx'
import Appointment from './component/appointment/index.jsx'

const appRouter = createBrowserRouter([
  {
      path: "/",
      element: <App/>,
      errorElement: <Error/>,
      children: [
          {
              path: "/",
              element: <Auth/>
          },
          {
            path: "/home",
            element: <ProtectedRoute><Home/></ProtectedRoute>
          },
          {
            path: "/doctorLogin",
            element: <DoctorAuth/>
          },
          {
            path: "/addPatient",
            element: <ProtectedRoute><AddPatient/></ProtectedRoute>
          },
          {
            path: "/bookappointment",
            element: <ProtectedRoute><Appointment/></ProtectedRoute>
          },
      ]
  }, 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={appRouter} />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
