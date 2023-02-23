import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { AccountPage } from './pages/AccountPage'
import { LoginPage } from './pages/LoginPage'
import { PeoplePage } from './pages/PeoplePage'
import { RegisterPage } from './pages/RegisterPage'
import { getMe } from './redux/auth/authSlice'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (<>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='account' element={<AccountPage />}/>
        <Route path='people' element={<PeoplePage />}/>
      </Routes>
      </>
  )
}

export default App