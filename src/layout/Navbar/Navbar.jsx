import React from 'react'
import Logo from '../../assets/svg/navigation/logo.svg'
import Logout from '../../assets/svg/navigation/logout.svg'

function Navbar(props) {
  return (
    <div className='flex'>
        <div>
          <div>
            <img src={Logo} alt="Logo" className='h-20 w-20'/>
          </div>
          <div className='h-screen w-34 bg-[#3EBC80] rounded-tr-lg'>
              <h1>sidebar</h1>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='h-20 bg-[#454545] flex justify-between items-center rounded-bl-lg text-white'>
            <div>
              <p>Selamat Siang, Daffa</p>
              <p>Update terbaru untuk anda</p>
            </div>
            <div>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded bg-cover flex items-center space-x-4'>
              <span>Logout</span>
              <img src={Logout} alt="Logout" className='h-4 w-4 mr-2' />
            </button>
            </div>
          </div>
          <div className=' flex-grow overflow-auto h-2'>{props.children}</div>
        </div>
    </div>
  )
}

export default Navbar