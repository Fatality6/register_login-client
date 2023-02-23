import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, registerUser } from '../redux/auth/authSlice'
import { validate } from '../utils/validate'

export const RegisterPage = () => {
  const [formErrors, setFormErrors] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const { status } = useSelector((state => state.auth))

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/people')
  }, [status, isAuth, navigate])

  useEffect(()=>{
    if (formErrors.username) toast.error(formErrors.username)
    if (formErrors.email) toast.error(formErrors.email)
    if (formErrors.password) toast.error(formErrors.password)
    if (formErrors.birthdate) toast.error(formErrors.birthdate)
    if (formErrors.gender) toast.error(formErrors.gender)
  },[formErrors])

  //проверка и отправка в redux объекта
  const handleSubmit = () => {
  const errors = validate(username,email,password,birthdate,gender)
  setFormErrors(errors)

  if (Object.keys(errors).length === 0) {
    try {
      const data = new FormData()
      data.append("username", username)
      data.append("email", email)
      data.append("password", password)
      data.append("birthdate", birthdate)
      data.append("gender", gender)
      data.append("image", image)
      dispatch(registerUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}
  
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='w-1/4 mx-auto mt-4 bg-white/10 p-4 rounded-lg'>

      <h1 className='text-lg text-white text-center'>Регистрация</h1>

      <label className='text-xs text-gray-400'>
        Ваше имя:
        <input
          type='text'
          placeholder='имя'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 ${
            formErrors.username ? "border-red-500" : ""
          }`}>
        </input>
      </label>

      <label className='text-xs text-gray-400'>
        Ваш email:
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 ${
            formErrors.email ? "border-red-500" : ""
          }`}>
        </input>
      </label>

      <label className='text-xs text-gray-400'>
        Придумайте пароль:
        <input
          type='password'
          placeholder='пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 ${
            formErrors.password ? "border-red-500" : ""
          }`}>
        </input>
      </label>

      <label className='text-xs text-gray-400'>
        Дата рождения:
        <input
          type='date'
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 ${
            formErrors.birthdate ? "border-red-600" : ""
          }`}>
        </input>
      </label>

      <div className="flex justify-around items-center mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5"
            value={1}
            checked={gender === 1}
            onChange={(e) => setGender(parseInt(e.target.value))}
          />
          <span className="ml-2 text-white">Мужчина</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5"
            value={2}
            checked={gender === 2}
            onChange={(e) => setGender(parseInt(e.target.value))}
          />
          <span className="ml-2 text-white">Женщина</span>
        </label>
      </div>

      <label className="flex justify-center items-center text-gray-300 py-2 bg-gray-600 text-xs my-4 border-2 border-dotted cursor-pointer">
        Добавить фото
        <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      {/* отображение выбранной картинки перед отправкой*/}
      <div className="flex justify-center items-center object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} className='h-20 rounded-full' />}
      </div>

      <div className='flex justify-between mt-4'>
        <button
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs text-white bg-gray-600 hover:bg-green-600 duration-300 rounded-sm py-2 px-4'>
          Подтвердить
        </button>
        <Link
          to={'/'}
          className="flex justify-center items-center text-xs text-white">
          Уже зарегистрированы?
        </Link>
      </div>

    </form>
  )
}
