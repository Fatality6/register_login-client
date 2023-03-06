import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Info from '../components/Info'
import Navbar from '../components/Navbar'
import UserItem from '../components/UserItem'
import { checkIsAuth } from '../redux/auth/authSlice'
import { getAllUsers } from '../redux/users/usersSlice'

export const PeoplePage = () => {
  const isAuth = useSelector(checkIsAuth)
  const user = useSelector((state)=> state.auth.user)
  const users = useSelector((state) => state.users.users)
  const [isOpen, setIsOpen] = useState(false)
  const [activeImage, setActiveImage] = useState('')
  const [activeName, setActiveName] = useState('')
  const [activeBirthdate, setActiveBirthdate] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) navigate('/')
    dispatch(getAllUsers())
  }, [isAuth, navigate, dispatch])

  const filteredUsers = users.filter((u)=>u._id !== user._id)

  if(!filteredUsers) return <div className='text-lg text-gray-800'>Список пользователей пуст</div>

  return (
    <div>
      <Navbar />
      <div
        className='flex justify-center mt-10 gap-10 flex-wrap'>
        {filteredUsers?.map((e) => <UserItem
          key={e._id}
          username={e.username}
          userPhoto={e.userPhoto}
          birthdate={e.birthdate}
          setIsOpen={setIsOpen}
          setActiveName={setActiveName}
          setActiveBirthdate={setActiveBirthdate}
          setActiveImage={setActiveImage}
          id={e._id}>
        </UserItem>)}
      </div>
      <Info 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeName={activeName}
        activeBirthdate={activeBirthdate}
        activeImage={activeImage}/>
    </div>
  )
}
