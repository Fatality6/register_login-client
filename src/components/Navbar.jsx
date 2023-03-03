import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../redux/auth/authSlice'

const Navbar = () => {

  const dispatch = useDispatch()

  const activeStyle = {
    color: 'white'
  }

  const logoutHandler = () => {
    dispatch ( logout() )
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <div className='flex py-4 px-4 justify-between items-center'>
      <div></div>
      <ul className="flex gap-8 ml-16">
        <li>
          <NavLink 
            to={'/people'} 
            href="/" 
            className="text-md text-gray-400 hover:text-white"
            style={({isActive})=>isActive ? activeStyle : undefined}>
              Аккаунты
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/account'} 
            href="/" 
            className="text-md text-gray-400 hover:text-white"
            style={({isActive})=>isActive ? activeStyle : undefined}>
              Профиль
          </NavLink>
        </li>
      </ul>

      <div className='flex justify-center item-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 cursor-pointer'>
        <button onClick={logoutHandler} >Выйти</button>
      </div>

    </div>
  )
}

export default Navbar
