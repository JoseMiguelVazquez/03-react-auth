import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { Home, Dashboard, Login, Signup, Secret } from '@/pages'

const RoutesIndex = () => {
  const { isAuth } = useAuthContext()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/dashboard'
        element={
          isAuth
            ? <Dashboard />
            : <Navigate to='/login' replace />
      }
      />
      <Route path='/secret' element={<Secret />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default RoutesIndex
