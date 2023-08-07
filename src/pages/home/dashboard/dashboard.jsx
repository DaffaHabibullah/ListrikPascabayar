import React from 'react'
import Navbar from '../../../layout/Navbar/Navbar'

function dashboard() {

  let data =[]
  for (let i = 0; i < 100; i++) {
    data.push(i)
  }

  return (
    <Navbar>
      {
        data.map((item, index) => {
          return (
            <div key={index} className='bg-red-500 h-20 w-20 m-2'>
              <h1>{item}</h1>
            </div>
          )
        })
      }
    </Navbar>
  )
}

export default dashboard