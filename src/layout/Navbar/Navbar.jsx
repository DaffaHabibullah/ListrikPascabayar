import React from 'react'

function Navbar(props) {
  return (
    <div className='flex'>
        <div className='h-screen w-34 bg-blue-500'>
            <h1>sidebar</h1>
        </div>
        <div className='flex flex-col w-full'>
            <div className='h-20 bg-red-500 flex justify-center items-center'>
                <h1>Navbar</h1>
            </div>
            <div className='bg-green-500 flex-grow overflow-auto h-2'>{props.children}</div>
        </div>
    </div>


  )
}

export default Navbar