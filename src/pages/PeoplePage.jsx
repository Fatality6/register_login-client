import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import UserItem from '../components/UserItem'
import { checkIsAuth } from '../redux/auth/authSlice'
import { getAllUsers } from '../redux/users/usersSlice'

export const PeoplePage = () => {
  const isAuth = useSelector(checkIsAuth)
  const users = useSelector((state) => state.users.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) navigate('/')
    dispatch(getAllUsers())
  }, [isAuth, navigate, dispatch])
  return (
    <div>
      <Navbar />
      <div
        className='flex justify-center mt-10 gap-10 flex-wrap'>
        {users?.map((e) => <UserItem
          key={e._id}
          username={e.username}
          userPhoto={e.userPhoto}
          id={e._id}>
        </UserItem>)}
      </div>
    </div>
  )
}
