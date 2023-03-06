import noPhoto from '../common/img/user.jpg'

const UserItem = ({ username, userPhoto, birthdate, setIsOpen, setActiveName, setActiveBirthdate, setActiveImage }) => {
  return (
    <div 
      className='flex items-center flex-col rounded-md cursor-pointer w-[250px] h-[300px]' 
      onClick={()=>{
        setIsOpen(true)
        setActiveName(username)
        setActiveBirthdate(birthdate)
        setActiveImage(userPhoto)}}>
      <img 
        alt={username}
        className='w-25 rounded-[50%] p-1 hover:shadow-xl hover:bg-white duration-300'
        src={userPhoto?`https://register-login-server.onrender.com/${userPhoto}`:noPhoto}/>
      <span className='mt-4'>{username}</span>
    </div>)
}
export default UserItem