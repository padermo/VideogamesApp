import React from 'react'

function Btn({onClick, name}) {
  return (
    <div className='container-btn'>
      <button onClick={onClick}>{name}</button>
    </div>
  )
}

export default Btn