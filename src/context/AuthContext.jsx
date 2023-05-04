/* eslint-disable react/prop-types */
// Funcion: decirme si el usuario esta logeado o no, manejar el web token
import { createContext, useContext, useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

// 1. Crear el contexto
const AuthContext = createContext()

// 2. Crear el proveedor
const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false) // ¿Estoy autenticado?
  const [userPayload, setUserPayload] = useState(null) // JWT Payload decodificado

  const login = (token) => {
    // Guardamos el token en el localStorage
    // Este dato permanece aún si el navegador se cierra y vuelve a abrir
    window.localStorage.setItem('token', token)
    // Decodificamos el token
    const decoded = jwt_decode(token)
    setUserPayload(decoded)
    setIsAuth(true)
  }

  // Pasos contrarios
  const logout = () => {
    // Borrar el token del local storage
    window.localStorage.removeItem('token')
    setUserPayload(null)
    setIsAuth(false)
  }

  useEffect(() => {
    // Recuperar el token, si no existe devolverá null
    const token = window.localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token)
      setUserPayload(decoded)
      setIsAuth(true)
    }
  }, [])

  const values = {
    isAuth,
    userPayload,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  )
}

// 3. Consumidor del contexto (opcional pero util)

const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthContext,
  AuthProvider,
  useAuthContext
}
