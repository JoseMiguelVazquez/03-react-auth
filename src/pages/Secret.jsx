import React from 'react'
import { useAuthContext } from '@/context/AuthContext'

const Secret = () => {
  const { userPayload } = useAuthContext()
  return (
    <>
      <h1>
        Secret
      </h1>
      {
        userPayload?.role === 'ADMIN'
          ? <h2>Hola Admin</h2>
          : <h2>Hola User</h2>
      }

      {userPayload?.role === 'CUSTOMER' &&
        <h2>Esto solo lo ve el CUSTOMER</h2>}

      {userPayload?.role === 'ADMIN' &&
        <h2>Esto solo lo ve el ADMIN</h2>}

    </>
  )
}

export default Secret
