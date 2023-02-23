import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, loginUser } from '../redux/auth/authSlice'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const {status} = useSelector((state => state.auth))

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/people')
},[status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({email,password}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='w-1/4 mx-auto mt-40 bg-white/10 p-4 rounded-lg'>

      <h1 className='text-lg text-white text-center'>Авторизация</h1>

      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-6 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700">
      </input>

      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700">
      </input>


      <div className='flex gap-8 justify-center mt-6'>
        <button
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs text-white bg-gray-600 hover:bg-green-600 duration-300 rounded-sm py-2 px-4'>
          Войти
        </button>
        <Link
          to={'/register'}
          className="flex justify-center items-center text-xs text-white bg-gray-600 hover:bg-sky-600 duration-300 rounded-sm py-2 px-4">
          Регистрация
        </Link>
      </div>

    </form>
  )
}
