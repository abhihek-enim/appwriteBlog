import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            //the logout reducer here from authService.logout() will give us a promise by which we can dispatch logout service from appwrite
     })   
    }
  return (
    <div>
      <button className='inline-block px-6 py-7 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Logout
