import React from 'react'

function CardBox({title, value, color}) {
  return (
    <div className='flex flex-col justify-evenly items-center bg-[color:var(--color)] ' style={{ '--color': color }}>
        <p>{title}</p>
        <p>{value}</p>
    </div>
  )
}

export default CardBox