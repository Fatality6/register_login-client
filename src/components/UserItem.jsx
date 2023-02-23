import { Link } from 'react-router-dom'
import noPhoto from '../common/img/user.jpg'

const UserItem = ({ username, userPhoto }) => {
  return <Link to={`/`}>
    <div className='flex items-center flex-col p-2 rounded-md'>
      <img 
        alt={username}
        className='w-25 rounded-[50%]'
        src={userPhoto?`http://localhost:8080/${userPhoto}`:noPhoto}/>
      <span>{username}</span>
    </div>
  </Link>
}
export default UserItem