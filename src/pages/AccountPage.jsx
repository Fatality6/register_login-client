import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import noPhoto from '../common/img/user.jpg'
import { EditUser } from '../components/EditUser'
import moment from 'moment'
import { checkIsAuth, updateUser } from '../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AccountPage = () => {
  const user = useSelector((state) => state.auth.user)
  const isAuth = useSelector(checkIsAuth)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) navigate('/')
  }, [isAuth, navigate])

  const formattedBirth = moment(user.birthdate).format("YYYY-MM-DD")
  const birthdate = new Date(formattedBirth)
  const ageInMs = Date.now() - birthdate.getTime()
  const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365))

  const handlerSubmit = () => {
    try {
      const data = new FormData()
      data.append("username", username)
      data.append("password", password)
      data.append("image", image)
      dispatch(updateUser(data))
      setIsOpen(false)
      toast('Профиль отредактирован')
    } catch (error) {
      console.log(error)
    }
  }
    
  return (
    <div>
      <Navbar />
      <div 
        className='flex-row justify-center text-gray-600 p-3 mx-auto h-[450px] w-[400px] mt-5 bg-slate-300 rounded-md hover:shadow-xl hover:bg-slate-200 transition duration-100 ease-in-out cursor-pointer '
        onClick={()=>setIsOpen(true)}>
          <img 
            src={user.userPhoto?`https://register-login-server.onrender.com/${user.userPhoto}`:noPhoto}
            className='w-full'
            alt={user.username} />
          <div className='mt-2'>{user.username}</div>
          <div>Возраст: {ageInYears} лет</div>
      </div>
      <EditUser 
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
        username={username} 
        setUsername={setUsername}
        birth={formattedBirth}
        setPassword={setPassword}
        image={image}
        setImage={setImage}
        handlerSubmit={handlerSubmit}
        />
    </div>
  )
  
}