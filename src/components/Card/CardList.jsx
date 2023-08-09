import React from 'react'

function CardList({list, title}) {
  return (
    <div>
        <p>{title}</p>
        {list.map((item, index) => (
            <div key={index} className="card">
                <p>{item.type}</p>
                <p>{item.label}</p>
            </div>
            ))
        }     
    </div>
  )
}

export default CardList