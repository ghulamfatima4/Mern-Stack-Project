import { ShoppingCart } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { persistor } from '@/redux/store';

const Navbar = () => {
  const {user} = useSelector(store => store.user)
  const navigate = useNavigate();
  // console.log(accesstoken);
  const dispatch = useDispatch();
  const handlerlogout = async() => {
  const accesstoken = localStorage.getItem("accesstoken");

    try {
      const res = await axios.post('http://localhost:3000/users/logout', {},{
        headers : {
          Authorization : `Bearer ${accesstoken}`
        }
      })
      if(res.data.message){
        dispatch(setUser( null))
        persistor.purge();  
        localStorage.removeItem("accesstoken");
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
        {/* logo section */}
          <div>
            <img src="/Ekart.png" alt="" className='w-25' />
          </div>
          {/* nav section */}
          <nav className='flex gap-10 justify-between items-center'>
              <ul className='flex gap-7 items-center text-xl font-semibold'>
                <Link to = {'/'}><li>Home</li></Link>
                <Link to = {'/products'}><li>Products</li></Link>
                {
                  user && <Link to={'/profile'}><li>Hello  {user.firstName}</li></Link>
                }
              </ul>
              <Link to={'/cart'} className='relative'>
              <ShoppingCart/>
              {/* <span className='absolute bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90'>0</span> */}
              <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2"
                    style={{ right: '-11px', top: '-19px' }}
                  >
                    0
                  </span>
              </Link>

              {
                user ? <Button onClick = {handlerlogout} className="bg-pink-600 text-white cursor-pointer">Logout</Button> : <Button onClick= {() => navigate('/login')} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointe">Login</Button>} 
          </nav>
      </div>
    </header>
    
  )
}

export default Navbar