import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import noPhoto from '../common/img/user.jpg'
import { EditUser } from '../components/EditUser'
import moment from 'moment'
import { checkIsAuth, updateUser } from '../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const AccountPage = () => {
  const isAuth = useSelector(checkIsAuth)
  const user = useSelector((state) => state.auth.user)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) navigate('/')
  }, [isAuth, navigate, dispatch])

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
      console.log(image)
    } catch (error) {
      console.log(error)
    }
  }
    
  return (
    <div>
      <Navbar />
      <div 
        className='flex-row justify-center text-gray-600 p-3 mx-auto mt-5 bg-slate-300 w-max rounded-md hover:shadow-xl hover:bg-slate-200 transition duration-100 ease-in-out cursor-pointer '
        onClick={()=>setIsOpen(true)}>
          <img src={user.userPhoto?`http://localhost:8080/${user.userPhoto}`:noPhoto} alt={username} />
          <div className='mt-2'>{username}</div>
          <div>Возраст: {ageInYears} лет</div>
      </div>
      <EditUser 
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
        username={username} 
        setUsername={setUsername}
        birth={formattedBirth}
        setPassword={setPassword}
        setImage={setImage}
        handlerSubmit={handlerSubmit}
        />
    </div>
  )
  
}